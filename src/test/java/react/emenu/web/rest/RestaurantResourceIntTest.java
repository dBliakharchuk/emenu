package react.emenu.web.rest;

import react.emenu.EmenuApp;

import react.emenu.domain.Restaurant;
import react.emenu.repository.RestaurantRepository;
import react.emenu.service.RestaurantService;
import react.emenu.service.dto.RestaurantDTO;
import react.emenu.service.mapper.RestaurantMapper;
import react.emenu.web.rest.errors.ExceptionTranslator;

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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static react.emenu.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RestaurantResource REST controller.
 *
 * @see RestaurantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmenuApp.class)
public class RestaurantResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_GOOGLE_MAPS_LINK = "AAAAAAAAAA";
    private static final String UPDATED_GOOGLE_MAPS_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_TRIP_ADVISOR_LINK = "AAAAAAAAAA";
    private static final String UPDATED_TRIP_ADVISOR_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_PAGE_LINK = "AAAAAAAAAA";
    private static final String UPDATED_WEB_PAGE_LINK = "BBBBBBBBBB";

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantMapper restaurantMapper;

    @Autowired
    private RestaurantService restaurantService;

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

    private MockMvc restRestaurantMockMvc;

    private Restaurant restaurant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestaurantResource restaurantResource = new RestaurantResource(restaurantService);
        this.restRestaurantMockMvc = MockMvcBuilders.standaloneSetup(restaurantResource)
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
    public static Restaurant createEntity(EntityManager em) {
        Restaurant restaurant = new Restaurant()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .googleMapsLink(DEFAULT_GOOGLE_MAPS_LINK)
            .tripAdvisorLink(DEFAULT_TRIP_ADVISOR_LINK)
            .webPageLink(DEFAULT_WEB_PAGE_LINK);
        return restaurant;
    }

    @Before
    public void initTest() {
        restaurant = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestaurant() throws Exception {
        int databaseSizeBeforeCreate = restaurantRepository.findAll().size();

        // Create the Restaurant
        RestaurantDTO restaurantDTO = restaurantMapper.toDto(restaurant);
        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantDTO)))
            .andExpect(status().isCreated());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeCreate + 1);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRestaurant.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRestaurant.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testRestaurant.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testRestaurant.getGoogleMapsLink()).isEqualTo(DEFAULT_GOOGLE_MAPS_LINK);
        assertThat(testRestaurant.getTripAdvisorLink()).isEqualTo(DEFAULT_TRIP_ADVISOR_LINK);
        assertThat(testRestaurant.getWebPageLink()).isEqualTo(DEFAULT_WEB_PAGE_LINK);
    }

    @Test
    @Transactional
    public void createRestaurantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restaurantRepository.findAll().size();

        // Create the Restaurant with an existing ID
        restaurant.setId(1L);
        RestaurantDTO restaurantDTO = restaurantMapper.toDto(restaurant);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = restaurantRepository.findAll().size();
        // set the field null
        restaurant.setName(null);

        // Create the Restaurant, which fails.
        RestaurantDTO restaurantDTO = restaurantMapper.toDto(restaurant);

        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantDTO)))
            .andExpect(status().isBadRequest());

        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRestaurants() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList
        restRestaurantMockMvc.perform(get("/api/restaurants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].googleMapsLink").value(hasItem(DEFAULT_GOOGLE_MAPS_LINK.toString())))
            .andExpect(jsonPath("$.[*].tripAdvisorLink").value(hasItem(DEFAULT_TRIP_ADVISOR_LINK.toString())))
            .andExpect(jsonPath("$.[*].webPageLink").value(hasItem(DEFAULT_WEB_PAGE_LINK.toString())));
    }
    
    @Test
    @Transactional
    public void getRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get the restaurant
        restRestaurantMockMvc.perform(get("/api/restaurants/{id}", restaurant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restaurant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.googleMapsLink").value(DEFAULT_GOOGLE_MAPS_LINK.toString()))
            .andExpect(jsonPath("$.tripAdvisorLink").value(DEFAULT_TRIP_ADVISOR_LINK.toString()))
            .andExpect(jsonPath("$.webPageLink").value(DEFAULT_WEB_PAGE_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRestaurant() throws Exception {
        // Get the restaurant
        restRestaurantMockMvc.perform(get("/api/restaurants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Update the restaurant
        Restaurant updatedRestaurant = restaurantRepository.findById(restaurant.getId()).get();
        // Disconnect from session so that the updates on updatedRestaurant are not directly saved in db
        em.detach(updatedRestaurant);
        updatedRestaurant
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .googleMapsLink(UPDATED_GOOGLE_MAPS_LINK)
            .tripAdvisorLink(UPDATED_TRIP_ADVISOR_LINK)
            .webPageLink(UPDATED_WEB_PAGE_LINK);
        RestaurantDTO restaurantDTO = restaurantMapper.toDto(updatedRestaurant);

        restRestaurantMockMvc.perform(put("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantDTO)))
            .andExpect(status().isOk());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRestaurant.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRestaurant.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testRestaurant.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testRestaurant.getGoogleMapsLink()).isEqualTo(UPDATED_GOOGLE_MAPS_LINK);
        assertThat(testRestaurant.getTripAdvisorLink()).isEqualTo(UPDATED_TRIP_ADVISOR_LINK);
        assertThat(testRestaurant.getWebPageLink()).isEqualTo(UPDATED_WEB_PAGE_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Create the Restaurant
        RestaurantDTO restaurantDTO = restaurantMapper.toDto(restaurant);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestaurantMockMvc.perform(put("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        int databaseSizeBeforeDelete = restaurantRepository.findAll().size();

        // Delete the restaurant
        restRestaurantMockMvc.perform(delete("/api/restaurants/{id}", restaurant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Restaurant.class);
        Restaurant restaurant1 = new Restaurant();
        restaurant1.setId(1L);
        Restaurant restaurant2 = new Restaurant();
        restaurant2.setId(restaurant1.getId());
        assertThat(restaurant1).isEqualTo(restaurant2);
        restaurant2.setId(2L);
        assertThat(restaurant1).isNotEqualTo(restaurant2);
        restaurant1.setId(null);
        assertThat(restaurant1).isNotEqualTo(restaurant2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestaurantDTO.class);
        RestaurantDTO restaurantDTO1 = new RestaurantDTO();
        restaurantDTO1.setId(1L);
        RestaurantDTO restaurantDTO2 = new RestaurantDTO();
        assertThat(restaurantDTO1).isNotEqualTo(restaurantDTO2);
        restaurantDTO2.setId(restaurantDTO1.getId());
        assertThat(restaurantDTO1).isEqualTo(restaurantDTO2);
        restaurantDTO2.setId(2L);
        assertThat(restaurantDTO1).isNotEqualTo(restaurantDTO2);
        restaurantDTO1.setId(null);
        assertThat(restaurantDTO1).isNotEqualTo(restaurantDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(restaurantMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(restaurantMapper.fromId(null)).isNull();
    }
}
