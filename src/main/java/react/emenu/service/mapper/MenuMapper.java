package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.MenuDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Menu and its DTO MenuDTO.
 */
@Mapper(componentModel = "spring", uses = {RestaurantMapper.class})
public interface MenuMapper extends EntityMapper<MenuDTO, Menu> {

    @Mapping(source = "restaurant.id", target = "restaurantId")
    @Mapping(source = "restaurant.idRestaurant", target = "restaurantIdRestaurant")
    MenuDTO toDto(Menu menu);

    @Mapping(source = "restaurantId", target = "restaurant")
    Menu toEntity(MenuDTO menuDTO);

    default Menu fromId(Long id) {
        if (id == null) {
            return null;
        }
        Menu menu = new Menu();
        menu.setId(id);
        return menu;
    }
}
