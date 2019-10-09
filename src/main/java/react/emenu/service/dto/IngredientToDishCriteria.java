package react.emenu.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the IngredientToDish entity. This class is used in IngredientToDishResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /ingredient-to-dishes?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class IngredientToDishCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter unit;

    private DoubleFilter weight;

    private BooleanFilter isMain;

    private BooleanFilter isHidden;

    private LongFilter toIngredientId;

    private LongFilter toDishId;

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getUnit() {
        return unit;
    }

    public void setUnit(StringFilter unit) {
        this.unit = unit;
    }

    public DoubleFilter getWeight() {
        return weight;
    }

    public void setWeight(DoubleFilter weight) {
        this.weight = weight;
    }

    public BooleanFilter getIsMain() {
        return isMain;
    }

    public void setIsMain(BooleanFilter isMain) {
        this.isMain = isMain;
    }

    public BooleanFilter getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(BooleanFilter isHidden) {
        this.isHidden = isHidden;
    }

    public LongFilter getToIngredientId() {
        return toIngredientId;
    }

    public void setToIngredientId(LongFilter toIngredientId) {
        this.toIngredientId = toIngredientId;
    }

    public LongFilter getToDishId() {
        return toDishId;
    }

    public void setToDishId(LongFilter toDishId) {
        this.toDishId = toDishId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final IngredientToDishCriteria that = (IngredientToDishCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(unit, that.unit) &&
            Objects.equals(weight, that.weight) &&
            Objects.equals(isMain, that.isMain) &&
            Objects.equals(isHidden, that.isHidden) &&
            Objects.equals(toIngredientId, that.toIngredientId) &&
            Objects.equals(toDishId, that.toDishId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        unit,
        weight,
        isMain,
        isHidden,
        toIngredientId,
        toDishId
        );
    }

    @Override
    public String toString() {
        return "IngredientToDishCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (unit != null ? "unit=" + unit + ", " : "") +
                (weight != null ? "weight=" + weight + ", " : "") +
                (isMain != null ? "isMain=" + isMain + ", " : "") +
                (isHidden != null ? "isHidden=" + isHidden + ", " : "") +
                (toIngredientId != null ? "toIngredientId=" + toIngredientId + ", " : "") +
                (toDishId != null ? "toDishId=" + toDishId + ", " : "") +
            "}";
    }

}
