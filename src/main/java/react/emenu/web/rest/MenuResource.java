package react.emenu.web.rest;
import react.emenu.service.MenuService;
import react.emenu.web.rest.errors.BadRequestAlertException;
import react.emenu.web.rest.util.HeaderUtil;
import react.emenu.web.rest.util.PaginationUtil;
import react.emenu.service.dto.MenuDTO;
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
 * REST controller for managing Menu.
 */
@RestController
@RequestMapping("/api")
public class MenuResource {

    private final Logger log = LoggerFactory.getLogger(MenuResource.class);

    private static final String ENTITY_NAME = "menu";

    private final MenuService menuService;

    public MenuResource(MenuService menuService) {
        this.menuService = menuService;
    }

    /**
     * POST  /menus : Create a new menu.
     *
     * @param menuDTO the menuDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new menuDTO, or with status 400 (Bad Request) if the menu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/menus")
    public ResponseEntity<MenuDTO> createMenu(@Valid @RequestBody MenuDTO menuDTO) throws URISyntaxException {
        log.debug("REST request to save Menu : {}", menuDTO);
        if (menuDTO.getId() != null) {
            throw new BadRequestAlertException("A new menu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MenuDTO result = menuService.save(menuDTO);
        return ResponseEntity.created(new URI("/api/menus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /menus : Updates an existing menu.
     *
     * @param menuDTO the menuDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated menuDTO,
     * or with status 400 (Bad Request) if the menuDTO is not valid,
     * or with status 500 (Internal Server Error) if the menuDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/menus")
    public ResponseEntity<MenuDTO> updateMenu(@Valid @RequestBody MenuDTO menuDTO) throws URISyntaxException {
        log.debug("REST request to update Menu : {}", menuDTO);
        if (menuDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MenuDTO result = menuService.save(menuDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, menuDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /menus : get all the menus.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of menus in body
     */
    @GetMapping("/menus")
    public ResponseEntity<List<MenuDTO>> getAllMenus(Pageable pageable) {
        log.debug("REST request to get a page of Menus");
        Page<MenuDTO> page = menuService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/menus");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /menus/:id : get the "id" menu.
     *
     * @param id the id of the menuDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the menuDTO, or with status 404 (Not Found)
     */
    @GetMapping("/menus/{id}")
    public ResponseEntity<MenuDTO> getMenu(@PathVariable Long id) {
        log.debug("REST request to get Menu : {}", id);
        Optional<MenuDTO> menuDTO = menuService.findOne(id);
        return ResponseUtil.wrapOrNotFound(menuDTO);
    }

    /**
     * DELETE  /menus/:id : delete the "id" menu.
     *
     * @param id the id of the menuDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/menus/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        log.debug("REST request to delete Menu : {}", id);
        menuService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
