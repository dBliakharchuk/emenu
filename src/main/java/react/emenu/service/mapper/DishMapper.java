package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.DishDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Dish and its DTO DishDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface DishMapper extends EntityMapper<DishDTO, Dish> {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.id", target = "categoryIdCategory")
    DishDTO toDto(Dish dish);

    @Mapping(source = "categoryId", target = "category")
    Dish toEntity(DishDTO dishDTO);

    default Dish fromId(Long id) {
        if (id == null) {
            return null;
        }
        Dish dish = new Dish();
        dish.setId(id);
        return dish;
    }
}
