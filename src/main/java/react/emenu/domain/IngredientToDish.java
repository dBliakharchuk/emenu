package react.emenu.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IngredientToDish.
 */
@Entity
@Table(name = "ingredient_to_dish")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IngredientToDish implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit")
    private String unit;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "is_main")
    private Boolean isMain;

    @Column(name = "is_hidden")
    private Boolean isHidden;

    @ManyToOne
    private Ingredient toIngredient;

    @ManyToOne
    private Dish toDish;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnit() {
        return unit;
    }

    public IngredientToDish unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getWeight() {
        return weight;
    }

    public IngredientToDish weight(Double weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Boolean isIsMain() {
        return isMain;
    }

    public IngredientToDish isMain(Boolean isMain) {
        this.isMain = isMain;
        return this;
    }

    public void setIsMain(Boolean isMain) {
        this.isMain = isMain;
    }

    public Boolean isIsHidden() {
        return isHidden;
    }

    public IngredientToDish isHidden(Boolean isHidden) {
        this.isHidden = isHidden;
        return this;
    }

    public void setIsHidden(Boolean isHidden) {
        this.isHidden = isHidden;
    }

    public Ingredient getToIngredient() {
        return toIngredient;
    }

    public IngredientToDish toIngredient(Ingredient ingredient) {
        this.toIngredient = ingredient;
        return this;
    }

    public void setToIngredient(Ingredient ingredient) {
        this.toIngredient = ingredient;
    }

    public Dish getToDish() {
        return toDish;
    }

    public IngredientToDish toDish(Dish dish) {
        this.toDish = dish;
        return this;
    }

    public void setToDish(Dish dish) {
        this.toDish = dish;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IngredientToDish ingredientToDish = (IngredientToDish) o;
        if (ingredientToDish.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ingredientToDish.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IngredientToDish{" +
            "id=" + getId() +
            ", unit='" + getUnit() + "'" +
            ", weight=" + getWeight() +
            ", isMain='" + isIsMain() + "'" +
            ", isHidden='" + isIsHidden() + "'" +
            "}";
    }
}
