package react.emenu.service;

import react.emenu.domain.IngredientToDish;
import react.emenu.repository.IngredientToDishRepository;
import react.emenu.service.dto.IngredientToDishDTO;
import react.emenu.service.mapper.IngredientToDishMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing IngredientToDish.
 */
@Service
@Transactional
public class IngredientToDishService {

    private final Logger log = LoggerFactory.getLogger(IngredientToDishService.class);

    private final IngredientToDishRepository ingredientToDishRepository;

    private final IngredientToDishMapper ingredientToDishMapper;

    public IngredientToDishService(IngredientToDishRepository ingredientToDishRepository, IngredientToDishMapper ingredientToDishMapper) {
        this.ingredientToDishRepository = ingredientToDishRepository;
        this.ingredientToDishMapper = ingredientToDishMapper;
    }

    /**
     * Save a ingredientToDish.
     *
     * @param ingredientToDishDTO the entity to save
     * @return the persisted entity
     */
    public IngredientToDishDTO save(IngredientToDishDTO ingredientToDishDTO) {
        log.debug("Request to save IngredientToDish : {}", ingredientToDishDTO);
        IngredientToDish ingredientToDish = ingredientToDishMapper.toEntity(ingredientToDishDTO);
        ingredientToDish = ingredientToDishRepository.save(ingredientToDish);
        return ingredientToDishMapper.toDto(ingredientToDish);
    }

    /**
     * Get all the ingredientToDishes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<IngredientToDishDTO> findAll(Pageable pageable) {
        log.debug("Request to get all IngredientToDishes");
        return ingredientToDishRepository.findAll(pageable)
            .map(ingredientToDishMapper::toDto);
    }


    /**
     * Get one ingredientToDish by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<IngredientToDishDTO> findOne(Long id) {
        log.debug("Request to get IngredientToDish : {}", id);
        return ingredientToDishRepository.findById(id)
            .map(ingredientToDishMapper::toDto);
    }

    /**
     * Delete the ingredientToDish by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete IngredientToDish : {}", id);
        ingredientToDishRepository.deleteById(id);
    }
}
