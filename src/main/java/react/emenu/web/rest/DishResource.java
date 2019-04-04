package react.emenu.web.rest;
import react.emenu.service.DishService;
import react.emenu.web.rest.errors.BadRequestAlertException;
import react.emenu.web.rest.util.HeaderUtil;
import react.emenu.web.rest.util.PaginationUtil;
import react.emenu.service.dto.DishDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

    private final DishService dishService;

    public DishResource(DishService dishService) {
        this.dishService = dishService;
    }

    /**
     * POST  /dishes : Create a new dish.
     *
     * @param dishDTO the dishDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dishDTO, or with status 400 (Bad Request) if the dish has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dishes")
    public ResponseEntity<DishDTO> createDish(@Valid @RequestBody DishDTO dishDTO) throws URISyntaxException {
        log.debug("REST request to save Dish : {}", dishDTO);
        if (dishDTO.getId() != null) {
            throw new BadRequestAlertException("A new dish cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DishDTO result = dishService.save(dishDTO);
        return ResponseEntity.created(new URI("/api/dishes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dishes : Updates an existing dish.
     *
     * @param dishDTO the dishDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dishDTO,
     * or with status 400 (Bad Request) if the dishDTO is not valid,
     * or with status 500 (Internal Server Error) if the dishDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dishes")
    public ResponseEntity<DishDTO> updateDish(@Valid @RequestBody DishDTO dishDTO) throws URISyntaxException {
        log.debug("REST request to update Dish : {}", dishDTO);
        if (dishDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DishDTO result = dishService.save(dishDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dishDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dishes : get all the dishes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dishes in body
     */
    @GetMapping("/dishes")
    public ResponseEntity<List<DishDTO>> getAllDishes(Pageable pageable) {
        log.debug("REST request to get a page of Dishes");
        Page<DishDTO> page = dishService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dishes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /dishes/:id : get the "id" dish.
     *
     * @param id the id of the dishDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dishDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dishes/{id}")
    public ResponseEntity<DishDTO> getDish(@PathVariable Long id) {
        log.debug("REST request to get Dish : {}", id);
        Optional<DishDTO> dishDTO = dishService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dishDTO);
    }

    /**
     * DELETE  /dishes/:id : delete the "id" dish.
     *
     * @param id the id of the dishDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dishes/{id}")
    public ResponseEntity<Void> deleteDish(@PathVariable Long id) {
        log.debug("REST request to delete Dish : {}", id);
        dishService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
