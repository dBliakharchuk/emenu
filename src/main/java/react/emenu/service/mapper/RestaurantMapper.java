package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.RestaurantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Restaurant and its DTO RestaurantDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, UserMapper.class})
public interface RestaurantMapper extends EntityMapper<RestaurantDTO, Restaurant> {

    @Mapping(source = "idLocation.id", target = "idLocationId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.id", target = "userIdUser")
    RestaurantDTO toDto(Restaurant restaurant);

    @Mapping(source = "idLocationId", target = "idLocation")
    @Mapping(source = "userId", target = "user")
    Restaurant toEntity(RestaurantDTO restaurantDTO);

    default Restaurant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Restaurant restaurant = new Restaurant();
        restaurant.setId(id);
        return restaurant;
    }
}
