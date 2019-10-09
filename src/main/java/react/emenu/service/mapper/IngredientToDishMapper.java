package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.IngredientToDishDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity IngredientToDish and its DTO IngredientToDishDTO.
 */
@Mapper(componentModel = "spring", uses = {IngredientMapper.class, DishMapper.class})
public interface IngredientToDishMapper extends EntityMapper<IngredientToDishDTO, IngredientToDish> {

    @Mapping(source = "toIngredient.id", target = "toIngredientId")
    @Mapping(source = "toDish.id", target = "toDishId")
    IngredientToDishDTO toDto(IngredientToDish ingredientToDish);

    @Mapping(source = "toIngredientId", target = "toIngredient")
    @Mapping(source = "toDishId", target = "toDish")
    IngredientToDish toEntity(IngredientToDishDTO ingredientToDishDTO);

    default IngredientToDish fromId(Long id) {
        if (id == null) {
            return null;
        }
        IngredientToDish ingredientToDish = new IngredientToDish();
        ingredientToDish.setId(id);
        return ingredientToDish;
    }
}
