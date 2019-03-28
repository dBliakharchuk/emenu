package react.emenu.web.rest;

import react.emenu.EmenuApp;

import react.emenu.domain.AuthoritySql;
import react.emenu.repository.AuthoritySqlRepository;
import react.emenu.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static react.emenu.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AuthoritySqlResource REST controller.
 *
 * @see AuthoritySqlResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmenuApp.class)
public class AuthoritySqlResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AuthoritySqlRepository authoritySqlRepository;

    @Mock
    private AuthoritySqlRepository authoritySqlRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAuthoritySqlMockMvc;

    private AuthoritySql authoritySql;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuthoritySqlResource authoritySqlResource = new AuthoritySqlResource(authoritySqlRepository);
        this.restAuthoritySqlMockMvc = MockMvcBuilders.standaloneSetup(authoritySqlResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuthoritySql createEntity(EntityManager em) {
        AuthoritySql authoritySql = new AuthoritySql()
            .name(DEFAULT_NAME);
        return authoritySql;
    }

    @Before
    public void initTest() {
        authoritySql = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuthoritySql() throws Exception {
        int databaseSizeBeforeCreate = authoritySqlRepository.findAll().size();

        // Create the AuthoritySql
        restAuthoritySqlMockMvc.perform(post("/api/authority-sqls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authoritySql)))
            .andExpect(status().isCreated());

        // Validate the AuthoritySql in the database
        List<AuthoritySql> authoritySqlList = authoritySqlRepository.findAll();
        assertThat(authoritySqlList).hasSize(databaseSizeBeforeCreate + 1);
        AuthoritySql testAuthoritySql = authoritySqlList.get(authoritySqlList.size() - 1);
        assertThat(testAuthoritySql.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createAuthoritySqlWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = authoritySqlRepository.findAll().size();

        // Create the AuthoritySql with an existing ID
        authoritySql.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuthoritySqlMockMvc.perform(post("/api/authority-sqls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authoritySql)))
            .andExpect(status().isBadRequest());

        // Validate the AuthoritySql in the database
        List<AuthoritySql> authoritySqlList = authoritySqlRepository.findAll();
        assertThat(authoritySqlList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = authoritySqlRepository.findAll().size();
        // set the field null
        authoritySql.setName(null);

        // Create the AuthoritySql, which fails.

        restAuthoritySqlMockMvc.perform(post("/api/authority-sqls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authoritySql)))
            .andExpect(status().isBadRequest());

        List<AuthoritySql> authoritySqlList = authoritySqlRepository.findAll();
        assertThat(authoritySqlList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAuthoritySqls() throws Exception {
        // Initialize the database
        authoritySqlRepository.saveAndFlush(authoritySql);

        // Get all the authoritySqlList
        restAuthoritySqlMockMvc.perform(get("/api/authority-sqls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(authoritySql.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAuthoritySqlsWithEagerRelationshipsIsEnabled() throws Exception {
        AuthoritySqlResource authoritySqlResource = new AuthoritySqlResource(authoritySqlRepositoryMock);
        when(authoritySqlRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAuthoritySqlMockMvc = MockMvcBuilders.standaloneSetup(authoritySqlResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAuthoritySqlMockMvc.perform(get("/api/authority-sqls?eagerload=true"))
        .andExpect(status().isOk());

        verify(authoritySqlRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAuthoritySqlsWithEagerRelationshipsIsNotEnabled() throws Exception {
        AuthoritySqlResource authoritySqlResource = new AuthoritySqlResource(authoritySqlRepositoryMock);
            when(authoritySqlRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAuthoritySqlMockMvc = MockMvcBuilders.standaloneSetup(authoritySqlResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAuthoritySqlMockMvc.perform(get("/api/authority-sqls?eagerload=true"))
        .andExpect(status().isOk());

            verify(authoritySqlRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAuthoritySql() throws Exception {
        // Initialize the database
        authoritySqlRepository.saveAndFlush(authoritySql);

        // Get the authoritySql
        restAuthoritySqlMockMvc.perform(get("/api/authority-sqls/{id}", authoritySql.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(authoritySql.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAuthoritySql() throws Exception {
        // Get the authoritySql
        restAuthoritySqlMockMvc.perform(get("/api/authority-sqls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuthoritySql() throws Exception {
        // Initialize the database
        authoritySqlRepository.saveAndFlush(authoritySql);

        int databaseSizeBeforeUpdate = authoritySqlRepository.findAll().size();

        // Update the authoritySql
        AuthoritySql updatedAuthoritySql = authoritySqlRepository.findById(authoritySql.getId()).get();
        // Disconnect from session so that the updates on updatedAuthoritySql are not directly saved in db
        em.detach(updatedAuthoritySql);
        updatedAuthoritySql
            .name(UPDATED_NAME);

        restAuthoritySqlMockMvc.perform(put("/api/authority-sqls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuthoritySql)))
            .andExpect(status().isOk());

        // Validate the AuthoritySql in the database
        List<AuthoritySql> authoritySqlList = authoritySqlRepository.findAll();
        assertThat(authoritySqlList).hasSize(databaseSizeBeforeUpdate);
        AuthoritySql testAuthoritySql = authoritySqlList.get(authoritySqlList.size() - 1);
        assertThat(testAuthoritySql.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingAuthoritySql() throws Exception {
        int databaseSizeBeforeUpdate = authoritySqlRepository.findAll().size();

        // Create the AuthoritySql

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuthoritySqlMockMvc.perform(put("/api/authority-sqls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authoritySql)))
            .andExpect(status().isBadRequest());

        // Validate the AuthoritySql in the database
        List<AuthoritySql> authoritySqlList = authoritySqlRepository.findAll();
        assertThat(authoritySqlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAuthoritySql() throws Exception {
        // Initialize the database
        authoritySqlRepository.saveAndFlush(authoritySql);

        int databaseSizeBeforeDelete = authoritySqlRepository.findAll().size();

        // Delete the authoritySql
        restAuthoritySqlMockMvc.perform(delete("/api/authority-sqls/{id}", authoritySql.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AuthoritySql> authoritySqlList = authoritySqlRepository.findAll();
        assertThat(authoritySqlList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuthoritySql.class);
        AuthoritySql authoritySql1 = new AuthoritySql();
        authoritySql1.setId(1L);
        AuthoritySql authoritySql2 = new AuthoritySql();
        authoritySql2.setId(authoritySql1.getId());
        assertThat(authoritySql1).isEqualTo(authoritySql2);
        authoritySql2.setId(2L);
        assertThat(authoritySql1).isNotEqualTo(authoritySql2);
        authoritySql1.setId(null);
        assertThat(authoritySql1).isNotEqualTo(authoritySql2);
    }
}
