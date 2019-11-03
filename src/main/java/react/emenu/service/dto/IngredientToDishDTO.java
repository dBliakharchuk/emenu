package react.emenu.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the IngredientToDish entity.
 */
public class IngredientToDishDTO implements Serializable {

    private Long id;

    private String unit;

    private Double weight;

    private Boolean isMain;

    private Boolean isHidden;


    private Long toIngredientId;

    private Long toDishId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Boolean isIsMain() {
        return isMain;
    }

    public void setIsMain(Boolean isMain) {
        this.isMain = isMain;
    }

    public Boolean isIsHidden() {
        return isHidden;
    }

    public void setIsHidden(Boolean isHidden) {
        this.isHidden = isHidden;
    }

    public Long getToIngredientId() {
        return toIngredientId;
    }

    public void setToIngredientId(Long ingredientId) {
        this.toIngredientId = ingredientId;
    }

    public Long getToDishId() {
        return toDishId;
    }

    public void setToDishId(Long dishId) {
        this.toDishId = dishId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IngredientToDishDTO ingredientToDishDTO = (IngredientToDishDTO) o;
        if (ingredientToDishDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ingredientToDishDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IngredientToDishDTO{" +
            "id=" + getId() +
            ", unit='" + getUnit() + "'" +
            ", weight=" + getWeight() +
            ", isMain='" + isIsMain() + "'" +
            ", isHidden='" + isIsHidden() + "'" +
            ", toIngredient=" + getToIngredientId() +
            ", toDish=" + getToDishId() +
            "}";
    }
}
