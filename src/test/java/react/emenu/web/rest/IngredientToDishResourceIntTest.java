package react.emenu.web.rest;

import react.emenu.EmenuApp;

import react.emenu.domain.IngredientToDish;
import react.emenu.domain.Ingredient;
import react.emenu.domain.Dish;
import react.emenu.repository.IngredientToDishRepository;
import react.emenu.service.IngredientToDishService;
import react.emenu.service.dto.IngredientToDishDTO;
import react.emenu.service.mapper.IngredientToDishMapper;
import react.emenu.web.rest.errors.ExceptionTranslator;
import react.emenu.service.dto.IngredientToDishCriteria;
import react.emenu.service.IngredientToDishQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static react.emenu.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IngredientToDishResource REST controller.
 *
 * @see IngredientToDishResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmenuApp.class)
public class IngredientToDishResourceIntTest {

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    private static final Double DEFAULT_WEIGHT = 1D;
    private static final Double UPDATED_WEIGHT = 2D;

    private static final Boolean DEFAULT_IS_MAIN = false;
    private static final Boolean UPDATED_IS_MAIN = true;

    private static final Boolean DEFAULT_IS_HIDDEN = false;
    private static final Boolean UPDATED_IS_HIDDEN = true;

    @Autowired
    private IngredientToDishRepository ingredientToDishRepository;

    @Autowired
    private IngredientToDishMapper ingredientToDishMapper;

    @Autowired
    private IngredientToDishService ingredientToDishService;

    @Autowired
    private IngredientToDishQueryService ingredientToDishQueryService;

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

    private MockMvc restIngredientToDishMockMvc;

    private IngredientToDish ingredientToDish;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IngredientToDishResource ingredientToDishResource = new IngredientToDishResource(ingredientToDishService, ingredientToDishQueryService);
        this.restIngredientToDishMockMvc = MockMvcBuilders.standaloneSetup(ingredientToDishResource)
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
    public static IngredientToDish createEntity(EntityManager em) {
        IngredientToDish ingredientToDish = new IngredientToDish()
            .unit(DEFAULT_UNIT)
            .weight(DEFAULT_WEIGHT)
            .isMain(DEFAULT_IS_MAIN)
            .isHidden(DEFAULT_IS_HIDDEN);
        return ingredientToDish;
    }

    @Before
    public void initTest() {
        ingredientToDish = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngredientToDish() throws Exception {
        int databaseSizeBeforeCreate = ingredientToDishRepository.findAll().size();

        // Create the IngredientToDish
        IngredientToDishDTO ingredientToDishDTO = ingredientToDishMapper.toDto(ingredientToDish);
        restIngredientToDishMockMvc.perform(post("/api/ingredient-to-dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientToDishDTO)))
            .andExpect(status().isCreated());

        // Validate the IngredientToDish in the database
        List<IngredientToDish> ingredientToDishList = ingredientToDishRepository.findAll();
        assertThat(ingredientToDishList).hasSize(databaseSizeBeforeCreate + 1);
        IngredientToDish testIngredientToDish = ingredientToDishList.get(ingredientToDishList.size() - 1);
        assertThat(testIngredientToDish.getUnit()).isEqualTo(DEFAULT_UNIT);
        assertThat(testIngredientToDish.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testIngredientToDish.isIsMain()).isEqualTo(DEFAULT_IS_MAIN);
        assertThat(testIngredientToDish.isIsHidden()).isEqualTo(DEFAULT_IS_HIDDEN);
    }

    @Test
    @Transactional
    public void createIngredientToDishWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingredientToDishRepository.findAll().size();

        // Create the IngredientToDish with an existing ID
        ingredientToDish.setId(1L);
        IngredientToDishDTO ingredientToDishDTO = ingredientToDishMapper.toDto(ingredientToDish);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredientToDishMockMvc.perform(post("/api/ingredient-to-dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientToDishDTO)))
            .andExpect(status().isBadRequest());

        // Validate the IngredientToDish in the database
        List<IngredientToDish> ingredientToDishList = ingredientToDishRepository.findAll();
        assertThat(ingredientToDishList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishes() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredientToDish.getId().intValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT.toString())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].isMain").value(hasItem(DEFAULT_IS_MAIN.booleanValue())))
            .andExpect(jsonPath("$.[*].isHidden").value(hasItem(DEFAULT_IS_HIDDEN.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getIngredientToDish() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get the ingredientToDish
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes/{id}", ingredientToDish.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingredientToDish.getId().intValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT.toString()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.isMain").value(DEFAULT_IS_MAIN.booleanValue()))
            .andExpect(jsonPath("$.isHidden").value(DEFAULT_IS_HIDDEN.booleanValue()));
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByUnitIsEqualToSomething() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where unit equals to DEFAULT_UNIT
        defaultIngredientToDishShouldBeFound("unit.equals=" + DEFAULT_UNIT);

        // Get all the ingredientToDishList where unit equals to UPDATED_UNIT
        defaultIngredientToDishShouldNotBeFound("unit.equals=" + UPDATED_UNIT);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByUnitIsInShouldWork() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where unit in DEFAULT_UNIT or UPDATED_UNIT
        defaultIngredientToDishShouldBeFound("unit.in=" + DEFAULT_UNIT + "," + UPDATED_UNIT);

        // Get all the ingredientToDishList where unit equals to UPDATED_UNIT
        defaultIngredientToDishShouldNotBeFound("unit.in=" + UPDATED_UNIT);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByUnitIsNullOrNotNull() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where unit is not null
        defaultIngredientToDishShouldBeFound("unit.specified=true");

        // Get all the ingredientToDishList where unit is null
        defaultIngredientToDishShouldNotBeFound("unit.specified=false");
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByWeightIsEqualToSomething() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where weight equals to DEFAULT_WEIGHT
        defaultIngredientToDishShouldBeFound("weight.equals=" + DEFAULT_WEIGHT);

        // Get all the ingredientToDishList where weight equals to UPDATED_WEIGHT
        defaultIngredientToDishShouldNotBeFound("weight.equals=" + UPDATED_WEIGHT);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByWeightIsInShouldWork() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where weight in DEFAULT_WEIGHT or UPDATED_WEIGHT
        defaultIngredientToDishShouldBeFound("weight.in=" + DEFAULT_WEIGHT + "," + UPDATED_WEIGHT);

        // Get all the ingredientToDishList where weight equals to UPDATED_WEIGHT
        defaultIngredientToDishShouldNotBeFound("weight.in=" + UPDATED_WEIGHT);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByWeightIsNullOrNotNull() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where weight is not null
        defaultIngredientToDishShouldBeFound("weight.specified=true");

        // Get all the ingredientToDishList where weight is null
        defaultIngredientToDishShouldNotBeFound("weight.specified=false");
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByIsMainIsEqualToSomething() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where isMain equals to DEFAULT_IS_MAIN
        defaultIngredientToDishShouldBeFound("isMain.equals=" + DEFAULT_IS_MAIN);

        // Get all the ingredientToDishList where isMain equals to UPDATED_IS_MAIN
        defaultIngredientToDishShouldNotBeFound("isMain.equals=" + UPDATED_IS_MAIN);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByIsMainIsInShouldWork() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where isMain in DEFAULT_IS_MAIN or UPDATED_IS_MAIN
        defaultIngredientToDishShouldBeFound("isMain.in=" + DEFAULT_IS_MAIN + "," + UPDATED_IS_MAIN);

        // Get all the ingredientToDishList where isMain equals to UPDATED_IS_MAIN
        defaultIngredientToDishShouldNotBeFound("isMain.in=" + UPDATED_IS_MAIN);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByIsMainIsNullOrNotNull() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where isMain is not null
        defaultIngredientToDishShouldBeFound("isMain.specified=true");

        // Get all the ingredientToDishList where isMain is null
        defaultIngredientToDishShouldNotBeFound("isMain.specified=false");
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByIsHiddenIsEqualToSomething() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where isHidden equals to DEFAULT_IS_HIDDEN
        defaultIngredientToDishShouldBeFound("isHidden.equals=" + DEFAULT_IS_HIDDEN);

        // Get all the ingredientToDishList where isHidden equals to UPDATED_IS_HIDDEN
        defaultIngredientToDishShouldNotBeFound("isHidden.equals=" + UPDATED_IS_HIDDEN);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByIsHiddenIsInShouldWork() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where isHidden in DEFAULT_IS_HIDDEN or UPDATED_IS_HIDDEN
        defaultIngredientToDishShouldBeFound("isHidden.in=" + DEFAULT_IS_HIDDEN + "," + UPDATED_IS_HIDDEN);

        // Get all the ingredientToDishList where isHidden equals to UPDATED_IS_HIDDEN
        defaultIngredientToDishShouldNotBeFound("isHidden.in=" + UPDATED_IS_HIDDEN);
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByIsHiddenIsNullOrNotNull() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        // Get all the ingredientToDishList where isHidden is not null
        defaultIngredientToDishShouldBeFound("isHidden.specified=true");

        // Get all the ingredientToDishList where isHidden is null
        defaultIngredientToDishShouldNotBeFound("isHidden.specified=false");
    }

    @Test
    @Transactional
    public void getAllIngredientToDishesByToIngredientIsEqualToSomething() throws Exception {
        // Initialize the database
        Ingredient toIngredient = IngredientResourceIntTest.createEntity(em);
        em.persist(toIngredient);
        em.flush();
        ingredientToDish.setToIngredient(toIngredient);
        ingredientToDishRepository.saveAndFlush(ingredientToDish);
        Long toIngredientId = toIngredient.getId();

        // Get all the ingredientToDishList where toIngredient equals to toIngredientId
        defaultIngredientToDishShouldBeFound("toIngredientId.equals=" + toIngredientId);

        // Get all the ingredientToDishList where toIngredient equals to toIngredientId + 1
        defaultIngredientToDishShouldNotBeFound("toIngredientId.equals=" + (toIngredientId + 1));
    }


    @Test
    @Transactional
    public void getAllIngredientToDishesByToDishIsEqualToSomething() throws Exception {
        // Initialize the database
        Dish toDish = DishResourceIntTest.createEntity(em);
        em.persist(toDish);
        em.flush();
        ingredientToDish.setToDish(toDish);
        ingredientToDishRepository.saveAndFlush(ingredientToDish);
        Long toDishId = toDish.getId();

        // Get all the ingredientToDishList where toDish equals to toDishId
        defaultIngredientToDishShouldBeFound("toDishId.equals=" + toDishId);

        // Get all the ingredientToDishList where toDish equals to toDishId + 1
        defaultIngredientToDishShouldNotBeFound("toDishId.equals=" + (toDishId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultIngredientToDishShouldBeFound(String filter) throws Exception {
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredientToDish.getId().intValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].isMain").value(hasItem(DEFAULT_IS_MAIN.booleanValue())))
            .andExpect(jsonPath("$.[*].isHidden").value(hasItem(DEFAULT_IS_HIDDEN.booleanValue())));

        // Check, that the count call also returns 1
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultIngredientToDishShouldNotBeFound(String filter) throws Exception {
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingIngredientToDish() throws Exception {
        // Get the ingredientToDish
        restIngredientToDishMockMvc.perform(get("/api/ingredient-to-dishes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngredientToDish() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        int databaseSizeBeforeUpdate = ingredientToDishRepository.findAll().size();

        // Update the ingredientToDish
        IngredientToDish updatedIngredientToDish = ingredientToDishRepository.findById(ingredientToDish.getId()).get();
        // Disconnect from session so that the updates on updatedIngredientToDish are not directly saved in db
        em.detach(updatedIngredientToDish);
        updatedIngredientToDish
            .unit(UPDATED_UNIT)
            .weight(UPDATED_WEIGHT)
            .isMain(UPDATED_IS_MAIN)
            .isHidden(UPDATED_IS_HIDDEN);
        IngredientToDishDTO ingredientToDishDTO = ingredientToDishMapper.toDto(updatedIngredientToDish);

        restIngredientToDishMockMvc.perform(put("/api/ingredient-to-dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientToDishDTO)))
            .andExpect(status().isOk());

        // Validate the IngredientToDish in the database
        List<IngredientToDish> ingredientToDishList = ingredientToDishRepository.findAll();
        assertThat(ingredientToDishList).hasSize(databaseSizeBeforeUpdate);
        IngredientToDish testIngredientToDish = ingredientToDishList.get(ingredientToDishList.size() - 1);
        assertThat(testIngredientToDish.getUnit()).isEqualTo(UPDATED_UNIT);
        assertThat(testIngredientToDish.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testIngredientToDish.isIsMain()).isEqualTo(UPDATED_IS_MAIN);
        assertThat(testIngredientToDish.isIsHidden()).isEqualTo(UPDATED_IS_HIDDEN);
    }

    @Test
    @Transactional
    public void updateNonExistingIngredientToDish() throws Exception {
        int databaseSizeBeforeUpdate = ingredientToDishRepository.findAll().size();

        // Create the IngredientToDish
        IngredientToDishDTO ingredientToDishDTO = ingredientToDishMapper.toDto(ingredientToDish);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngredientToDishMockMvc.perform(put("/api/ingredient-to-dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientToDishDTO)))
            .andExpect(status().isBadRequest());

        // Validate the IngredientToDish in the database
        List<IngredientToDish> ingredientToDishList = ingredientToDishRepository.findAll();
        assertThat(ingredientToDishList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIngredientToDish() throws Exception {
        // Initialize the database
        ingredientToDishRepository.saveAndFlush(ingredientToDish);

        int databaseSizeBeforeDelete = ingredientToDishRepository.findAll().size();

        // Delete the ingredientToDish
        restIngredientToDishMockMvc.perform(delete("/api/ingredient-to-dishes/{id}", ingredientToDish.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IngredientToDish> ingredientToDishList = ingredientToDishRepository.findAll();
        assertThat(ingredientToDishList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IngredientToDish.class);
        IngredientToDish ingredientToDish1 = new IngredientToDish();
        ingredientToDish1.setId(1L);
        IngredientToDish ingredientToDish2 = new IngredientToDish();
        ingredientToDish2.setId(ingredientToDish1.getId());
        assertThat(ingredientToDish1).isEqualTo(ingredientToDish2);
        ingredientToDish2.setId(2L);
        assertThat(ingredientToDish1).isNotEqualTo(ingredientToDish2);
        ingredientToDish1.setId(null);
        assertThat(ingredientToDish1).isNotEqualTo(ingredientToDish2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IngredientToDishDTO.class);
        IngredientToDishDTO ingredientToDishDTO1 = new IngredientToDishDTO();
        ingredientToDishDTO1.setId(1L);
        IngredientToDishDTO ingredientToDishDTO2 = new IngredientToDishDTO();
        assertThat(ingredientToDishDTO1).isNotEqualTo(ingredientToDishDTO2);
        ingredientToDishDTO2.setId(ingredientToDishDTO1.getId());
        assertThat(ingredientToDishDTO1).isEqualTo(ingredientToDishDTO2);
        ingredientToDishDTO2.setId(2L);
        assertThat(ingredientToDishDTO1).isNotEqualTo(ingredientToDishDTO2);
        ingredientToDishDTO1.setId(null);
        assertThat(ingredientToDishDTO1).isNotEqualTo(ingredientToDishDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ingredientToDishMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ingredientToDishMapper.fromId(null)).isNull();
    }
}
