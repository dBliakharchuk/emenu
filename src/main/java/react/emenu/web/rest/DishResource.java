package react.emenu.web.rest;
import react.emenu.domain.Dish;
import react.emenu.repository.DishRepository;
import react.emenu.web.rest.errors.BadRequestAlertException;
import react.emenu.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Dish.
 */
@RestController
@RequestMapping("/api")
public class DishResource {

    private final Logger log = LoggerFactory.getLogger(DishResource.class);

    private static final String ENTITY_NAME = "dish";

    private final DishRepository dishRepository;

    public DishResource(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    /**
     * POST  /dishes : Create a new dish.
     *
     * @param dish the dish to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dish, or with status 400 (Bad Request) if the dish has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dishes")
    public ResponseEntity<Dish> createDish(@Valid @RequestBody Dish dish) throws URISyntaxException {
        log.debug("REST request to save Dish : {}", dish);
        if (dish.getId() != null) {
            throw new BadRequestAlertException("A new dish cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dish result = dishRepository.save(dish);
        return ResponseEntity.created(new URI("/api/dishes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dishes : Updates an existing dish.
     *
     * @param dish the dish to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dish,
     * or with status 400 (Bad Request) if the dish is not valid,
     * or with status 500 (Internal Server Error) if the dish couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dishes")
    public ResponseEntity<Dish> updateDish(@Valid @RequestBody Dish dish) throws URISyntaxException {
        log.debug("REST request to update Dish : {}", dish);
        if (dish.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dish result = dishRepository.save(dish);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dish.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dishes : get all the dishes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dishes in body
     */
    @GetMapping("/dishes")
    public List<Dish> getAllDishes() {
        log.debug("REST request to get all Dishes");
        return dishRepository.findAll();
    }

    /**
     * GET  /dishes/:id : get the "id" dish.
     *
     * @param id the id of the dish to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dish, or with status 404 (Not Found)
     */
    @GetMapping("/dishes/{id}")
    public ResponseEntity<Dish> getDish(@PathVariable Long id) {
        log.debug("REST request to get Dish : {}", id);
        Optional<Dish> dish = dishRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dish);
    }

    /**
     * DELETE  /dishes/:id : delete the "id" dish.
     *
     * @param id the id of the dish to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dishes/{id}")
    public ResponseEntity<Void> deleteDish(@PathVariable Long id) {
        log.debug("REST request to delete Dish : {}", id);
        dishRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
