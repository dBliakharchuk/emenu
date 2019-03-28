package react.emenu.web.rest;
import react.emenu.domain.AuthoritySql;
import react.emenu.repository.AuthoritySqlRepository;
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
 * REST controller for managing AuthoritySql.
 */
@RestController
@RequestMapping("/api")
public class AuthoritySqlResource {

    private final Logger log = LoggerFactory.getLogger(AuthoritySqlResource.class);

    private static final String ENTITY_NAME = "authoritySql";

    private final AuthoritySqlRepository authoritySqlRepository;

    public AuthoritySqlResource(AuthoritySqlRepository authoritySqlRepository) {
        this.authoritySqlRepository = authoritySqlRepository;
    }

    /**
     * POST  /authority-sqls : Create a new authoritySql.
     *
     * @param authoritySql the authoritySql to create
     * @return the ResponseEntity with status 201 (Created) and with body the new authoritySql, or with status 400 (Bad Request) if the authoritySql has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/authority-sqls")
    public ResponseEntity<AuthoritySql> createAuthoritySql(@Valid @RequestBody AuthoritySql authoritySql) throws URISyntaxException {
        log.debug("REST request to save AuthoritySql : {}", authoritySql);
        if (authoritySql.getId() != null) {
            throw new BadRequestAlertException("A new authoritySql cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AuthoritySql result = authoritySqlRepository.save(authoritySql);
        return ResponseEntity.created(new URI("/api/authority-sqls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /authority-sqls : Updates an existing authoritySql.
     *
     * @param authoritySql the authoritySql to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated authoritySql,
     * or with status 400 (Bad Request) if the authoritySql is not valid,
     * or with status 500 (Internal Server Error) if the authoritySql couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/authority-sqls")
    public ResponseEntity<AuthoritySql> updateAuthoritySql(@Valid @RequestBody AuthoritySql authoritySql) throws URISyntaxException {
        log.debug("REST request to update AuthoritySql : {}", authoritySql);
        if (authoritySql.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AuthoritySql result = authoritySqlRepository.save(authoritySql);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, authoritySql.getId().toString()))
            .body(result);
    }

    /**
     * GET  /authority-sqls : get all the authoritySqls.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of authoritySqls in body
     */
    @GetMapping("/authority-sqls")
    public List<AuthoritySql> getAllAuthoritySqls(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all AuthoritySqls");
        return authoritySqlRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /authority-sqls/:id : get the "id" authoritySql.
     *
     * @param id the id of the authoritySql to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the authoritySql, or with status 404 (Not Found)
     */
    @GetMapping("/authority-sqls/{id}")
    public ResponseEntity<AuthoritySql> getAuthoritySql(@PathVariable Long id) {
        log.debug("REST request to get AuthoritySql : {}", id);
        Optional<AuthoritySql> authoritySql = authoritySqlRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(authoritySql);
    }

    /**
     * DELETE  /authority-sqls/:id : delete the "id" authoritySql.
     *
     * @param id the id of the authoritySql to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/authority-sqls/{id}")
    public ResponseEntity<Void> deleteAuthoritySql(@PathVariable Long id) {
        log.debug("REST request to delete AuthoritySql : {}", id);
        authoritySqlRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
