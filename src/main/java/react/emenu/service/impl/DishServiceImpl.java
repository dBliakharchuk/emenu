package react.emenu.service.impl;

import react.emenu.service.DishService;
import react.emenu.domain.Dish;
import react.emenu.repository.DishRepository;
import react.emenu.service.dto.DishDTO;
import react.emenu.service.mapper.DishMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Dish.
 */
@Service
@Transactional
public class DishServiceImpl implements DishService {

    private final Logger log = LoggerFactory.getLogger(DishServiceImpl.class);

    private final DishRepository dishRepository;

    private final DishMapper dishMapper;

    public DishServiceImpl(DishRepository dishRepository, DishMapper dishMapper) {
        this.dishRepository = dishRepository;
        this.dishMapper = dishMapper;
    }

    /**
     * Save a dish.
     *
     * @param dishDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DishDTO save(DishDTO dishDTO) {
        log.debug("Request to save Dish : {}", dishDTO);
        Dish dish = dishMapper.toEntity(dishDTO);
        dish = dishRepository.save(dish);
        return dishMapper.toDto(dish);
    }

    /**
     * Get all the dishes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DishDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Dishes");
        return dishRepository.findAll(pageable)
            .map(dishMapper::toDto);
    }


    /**
     * Get one dish by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DishDTO> findOne(Long id) {
        log.debug("Request to get Dish : {}", id);
        return dishRepository.findById(id)
            .map(dishMapper::toDto);
    }

    /**
     * Delete the dish by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dish : {}", id);
        dishRepository.deleteById(id);
    }
}
