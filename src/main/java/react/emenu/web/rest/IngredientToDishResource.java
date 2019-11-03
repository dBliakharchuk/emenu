package react.emenu.web.rest;
import react.emenu.service.IngredientToDishService;
import react.emenu.web.rest.errors.BadRequestAlertException;
import react.emenu.web.rest.util.HeaderUtil;
import react.emenu.web.rest.util.PaginationUtil;
import react.emenu.service.dto.IngredientToDishDTO;
import react.emenu.service.dto.IngredientToDishCriteria;
import react.emenu.service.IngredientToDishQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing IngredientToDish.
 */
@RestController
@RequestMapping("/api")
public class IngredientToDishResource {

    private final Logger log = LoggerFactory.getLogger(IngredientToDishResource.class);

    private static final String ENTITY_NAME = "ingredientToDish";

    private final IngredientToDishService ingredientToDishService;

    private final IngredientToDishQueryService ingredientToDishQueryService;

    public IngredientToDishResource(IngredientToDishService ingredientToDishService, IngredientToDishQueryService ingredientToDishQueryService) {
        this.ingredientToDishService = ingredientToDishService;
        this.ingredientToDishQueryService = ingredientToDishQueryService;
    }

    /**
     * POST  /ingredient-to-dishes : Create a new ingredientToDish.
     *
     * @param ingredientToDishDTO the ingredientToDishDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ingredientToDishDTO, or with status 400 (Bad Request) if the ingredientToDish has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ingredient-to-dishes")
    public ResponseEntity<IngredientToDishDTO> createIngredientToDish(@RequestBody IngredientToDishDTO ingredientToDishDTO) throws URISyntaxException {
        log.debug("REST request to save IngredientToDish : {}", ingredientToDishDTO);
        if (ingredientToDishDTO.getId() != null) {
            throw new BadRequestAlertException("A new ingredientToDish cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IngredientToDishDTO result = ingredientToDishService.save(ingredientToDishDTO);
        return ResponseEntity.created(new URI("/api/ingredient-to-dishes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ingredient-to-dishes : Updates an existing ingredientToDish.
     *
     * @param ingredientToDishDTO the ingredientToDishDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ingredientToDishDTO,
     * or with status 400 (Bad Request) if the ingredientToDishDTO is not valid,
     * or with status 500 (Internal Server Error) if the ingredientToDishDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ingredient-to-dishes")
    public ResponseEntity<IngredientToDishDTO> updateIngredientToDish(@RequestBody IngredientToDishDTO ingredientToDishDTO) throws URISyntaxException {
        log.debug("REST request to update IngredientToDish : {}", ingredientToDishDTO);
        if (ingredientToDishDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IngredientToDishDTO result = ingredientToDishService.save(ingredientToDishDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ingredientToDishDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ingredient-to-dishes : get all the ingredientToDishes.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of ingredientToDishes in body
     */
    @GetMapping("/ingredient-to-dishes")
    public ResponseEntity<List<IngredientToDishDTO>> getAllIngredientToDishes(IngredientToDishCriteria criteria, Pageable pageable) {
        log.debug("REST request to get IngredientToDishes by criteria: {}", criteria);
        Page<IngredientToDishDTO> page = ingredientToDishQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ingredient-to-dishes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /ingredient-to-dishes/count : count all the ingredientToDishes.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/ingredient-to-dishes/count")
    public ResponseEntity<Long> countIngredientToDishes(IngredientToDishCriteria criteria) {
        log.debug("REST request to count IngredientToDishes by criteria: {}", criteria);
        return ResponseEntity.ok().body(ingredientToDishQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /ingredient-to-dishes/:id : get the "id" ingredientToDish.
     *
     * @param id the id of the ingredientToDishDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ingredientToDishDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ingredient-to-dishes/{id}")
    public ResponseEntity<IngredientToDishDTO> getIngredientToDish(@PathVariable Long id) {
        log.debug("REST request to get IngredientToDish : {}", id);
        Optional<IngredientToDishDTO> ingredientToDishDTO = ingredientToDishService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ingredientToDishDTO);
    }

    /**
     * DELETE  /ingredient-to-dishes/:id : delete the "id" ingredientToDish.
     *
     * @param id the id of the ingredientToDishDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ingredient-to-dishes/{id}")
    public ResponseEntity<Void> deleteIngredientToDish(@PathVariable Long id) {
        log.debug("REST request to delete IngredientToDish : {}", id);
        ingredientToDishService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
