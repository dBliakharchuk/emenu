package react.emenu.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Photo entity.
 */
public class PhotoDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    private String description;

    
    @Lob
    private byte[] image;

    private String imageContentType;

    private Long restaurantId;

    private String restaurantIdRestaurant;

    private Long dishId;

    private String dishIdDish;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantIdRestaurant() {
        return restaurantIdRestaurant;
    }

    public void setRestaurantIdRestaurant(String restaurantIdRestaurant) {
        this.restaurantIdRestaurant = restaurantIdRestaurant;
    }

    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    public String getDishIdDish() {
        return dishIdDish;
    }

    public void setDishIdDish(String dishIdDish) {
        this.dishIdDish = dishIdDish;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PhotoDTO photoDTO = (PhotoDTO) o;
        if (photoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PhotoDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", restaurant=" + getRestaurantId() +
            ", restaurant='" + getRestaurantIdRestaurant() + "'" +
            ", dish=" + getDishId() +
            ", dish='" + getDishIdDish() + "'" +
            "}";
    }
}
