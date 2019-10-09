package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.IngredientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ingredient and its DTO IngredientDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IngredientMapper extends EntityMapper<IngredientDTO, Ingredient> {



    default Ingredient fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ingredient ingredient = new Ingredient();
        ingredient.setId(id);
        return ingredient;
    }
}
