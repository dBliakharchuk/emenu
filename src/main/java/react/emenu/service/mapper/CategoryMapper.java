package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.CategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Category and its DTO CategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {MenuMapper.class})
public interface CategoryMapper extends EntityMapper<CategoryDTO, Category> {

    @Mapping(source = "menu.id", target = "menuId")
    @Mapping(source = "menu.id", target = "menuIdMenu")
    CategoryDTO toDto(Category category);

    @Mapping(source = "menuId", target = "menu")
    Category toEntity(CategoryDTO categoryDTO);

    default Category fromId(Long id) {
        if (id == null) {
            return null;
        }
        Category category = new Category();
        category.setId(id);
        return category;
    }
}
