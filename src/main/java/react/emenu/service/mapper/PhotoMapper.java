package react.emenu.service.mapper;

import react.emenu.domain.*;
import react.emenu.service.dto.PhotoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Photo and its DTO PhotoDTO.
 */
@Mapper(componentModel = "spring", uses = {RestaurantMapper.class, DishMapper.class})
public interface PhotoMapper extends EntityMapper<PhotoDTO, Photo> {

    @Mapping(source = "restaurant.id", target = "restaurantId")
    @Mapping(source = "restaurant.id", target = "restaurantIdRestaurant")
    @Mapping(source = "dish.id", target = "dishId")
    @Mapping(source = "dish.id", target = "dishIdDish")
    PhotoDTO toDto(Photo photo);

    @Mapping(source = "restaurantId", target = "restaurant")
    @Mapping(source = "dishId", target = "dish")
    Photo toEntity(PhotoDTO photoDTO);

    default Photo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Photo photo = new Photo();
        photo.setId(id);
        return photo;
    }
}
