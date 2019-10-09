package react.emenu.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Restaurant entity.
 */
public class RestaurantDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String description;

    @Lob
    private byte[] image;

    private String imageContentType;
    private String googleMapsLink;

    private String tripAdvisorLink;

    private String webPageLink;


    private Long idLocationId;

    private Long userId;

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

    public String getGoogleMapsLink() {
        return googleMapsLink;
    }

    public void setGoogleMapsLink(String googleMapsLink) {
        this.googleMapsLink = googleMapsLink;
    }

    public String getTripAdvisorLink() {
        return tripAdvisorLink;
    }

    public void setTripAdvisorLink(String tripAdvisorLink) {
        this.tripAdvisorLink = tripAdvisorLink;
    }

    public String getWebPageLink() {
        return webPageLink;
    }

    public void setWebPageLink(String webPageLink) {
        this.webPageLink = webPageLink;
    }

    public Long getIdLocationId() {
        return idLocationId;
    }

    public void setIdLocationId(Long locationId) {
        this.idLocationId = locationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RestaurantDTO restaurantDTO = (RestaurantDTO) o;
        if (restaurantDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurantDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestaurantDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", googleMapsLink='" + getGoogleMapsLink() + "'" +
            ", tripAdvisorLink='" + getTripAdvisorLink() + "'" +
            ", webPageLink='" + getWebPageLink() + "'" +
            ", idLocation=" + getIdLocationId() +
            ", user=" + getUserId() +
            "}";
    }
}
