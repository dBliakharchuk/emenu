package react.emenu.service.impl;

import react.emenu.service.IngredientService;
import react.emenu.domain.Ingredient;
import react.emenu.repository.IngredientRepository;
import react.emenu.service.dto.IngredientDTO;
import react.emenu.service.mapper.IngredientMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Ingredient.
 */
@Service
@Transactional
public class IngredientServiceImpl implements IngredientService {

    private final Logger log = LoggerFactory.getLogger(IngredientServiceImpl.class);

    private final IngredientRepository ingredientRepository;

    private final IngredientMapper ingredientMapper;

    public IngredientServiceImpl(IngredientRepository ingredientRepository, IngredientMapper ingredientMapper) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientMapper = ingredientMapper;
    }

    /**
     * Save a ingredient.
     *
     * @param ingredientDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IngredientDTO save(IngredientDTO ingredientDTO) {
        log.debug("Request to save Ingredient : {}", ingredientDTO);
        Ingredient ingredient = ingredientMapper.toEntity(ingredientDTO);
        ingredient = ingredientRepository.save(ingredient);
        return ingredientMapper.toDto(ingredient);
    }

    /**
     * Get all the ingredients.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<IngredientDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ingredients");
        return ingredientRepository.findAll(pageable)
            .map(ingredientMapper::toDto);
    }


    /**
     * Get one ingredient by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<IngredientDTO> findOne(Long id) {
        log.debug("Request to get Ingredient : {}", id);
        return ingredientRepository.findById(id)
            .map(ingredientMapper::toDto);
    }

    /**
     * Delete the ingredient by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ingredient : {}", id);
        ingredientRepository.deleteById(id);
    }
}
