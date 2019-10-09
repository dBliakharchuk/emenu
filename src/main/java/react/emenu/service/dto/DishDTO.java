package react.emenu.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Dish entity.
 */
public class DishDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String description;

    @NotNull
    private Float price;

    @Lob
    private byte[] image;

    private String imageContentType;

    private Long categoryId;

    private String categoryIdCategory;

    private Long ingeredientToDishId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryIdCategory() {
        return categoryIdCategory;
    }

    public void setCategoryIdCategory(String categoryIdCategory) {
        this.categoryIdCategory = categoryIdCategory;
    }

    public Long getIngeredientToDishId() {
        return ingeredientToDishId;
    }

    public void setIngeredientToDishId(Long ingeredientToDishId) {
        this.ingeredientToDishId = ingeredientToDishId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DishDTO dishDTO = (DishDTO) o;
        if (dishDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dishDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DishDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", image='" + getImage() + "'" +
            ", category=" + getCategoryId() +
            ", category='" + getCategoryIdCategory() + "'" +
            ", ingeredientToDish=" + getIngeredientToDishId() +
            "}";
    }
}
