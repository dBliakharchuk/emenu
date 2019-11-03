package react.emenu.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import react.emenu.domain.IngredientToDish;
import react.emenu.domain.*; // for static metamodels
import react.emenu.repository.IngredientToDishRepository;
import react.emenu.service.dto.IngredientToDishCriteria;
import react.emenu.service.dto.IngredientToDishDTO;
import react.emenu.service.mapper.IngredientToDishMapper;

/**
 * Service for executing complex queries for IngredientToDish entities in the database.
 * The main input is a {@link IngredientToDishCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link IngredientToDishDTO} or a {@link Page} of {@link IngredientToDishDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class IngredientToDishQueryService extends QueryService<IngredientToDish> {

    private final Logger log = LoggerFactory.getLogger(IngredientToDishQueryService.class);

    private final IngredientToDishRepository ingredientToDishRepository;

    private final IngredientToDishMapper ingredientToDishMapper;

    public IngredientToDishQueryService(IngredientToDishRepository ingredientToDishRepository, IngredientToDishMapper ingredientToDishMapper) {
        this.ingredientToDishRepository = ingredientToDishRepository;
        this.ingredientToDishMapper = ingredientToDishMapper;
    }

    /**
     * Return a {@link List} of {@link IngredientToDishDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<IngredientToDishDTO> findByCriteria(IngredientToDishCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<IngredientToDish> specification = createSpecification(criteria);
        return ingredientToDishMapper.toDto(ingredientToDishRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link IngredientToDishDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<IngredientToDishDTO> findByCriteria(IngredientToDishCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<IngredientToDish> specification = createSpecification(criteria);
        return ingredientToDishRepository.findAll(specification, page)
            .map(ingredientToDishMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(IngredientToDishCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<IngredientToDish> specification = createSpecification(criteria);
        return ingredientToDishRepository.count(specification);
    }

    /**
     * Function to convert IngredientToDishCriteria to a {@link Specification}
     */
    private Specification<IngredientToDish> createSpecification(IngredientToDishCriteria criteria) {
        Specification<IngredientToDish> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), IngredientToDish_.id));
            }
            if (criteria.getUnit() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUnit(), IngredientToDish_.unit));
            }
            if (criteria.getWeight() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getWeight(), IngredientToDish_.weight));
            }
            if (criteria.getIsMain() != null) {
                specification = specification.and(buildSpecification(criteria.getIsMain(), IngredientToDish_.isMain));
            }
            if (criteria.getIsHidden() != null) {
                specification = specification.and(buildSpecification(criteria.getIsHidden(), IngredientToDish_.isHidden));
            }
            if (criteria.getToIngredientId() != null) {
                specification = specification.and(buildSpecification(criteria.getToIngredientId(),
                    root -> root.join(IngredientToDish_.toIngredient, JoinType.LEFT).get(Ingredient_.id)));
            }
            if (criteria.getToDishId() != null) {
                specification = specification.and(buildSpecification(criteria.getToDishId(),
                    root -> root.join(IngredientToDish_.toDish, JoinType.LEFT).get(Dish_.id)));
            }
        }
        return specification;
    }
}
