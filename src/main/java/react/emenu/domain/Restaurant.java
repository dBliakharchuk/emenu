package react.emenu.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "google_maps_link")
    private String googleMapsLink;

    @Column(name = "trip_advisor_link")
    private String tripAdvisorLink;

    @Column(name = "web_page_link")
    private String webPageLink;

    @OneToOne
    @JoinColumn(unique = true)
    private Location idLocation;

    @ManyToOne
    @JsonIgnoreProperties("restaurants")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Restaurant description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public Restaurant image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Restaurant imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getGoogleMapsLink() {
        return googleMapsLink;
    }

    public Restaurant googleMapsLink(String googleMapsLink) {
        this.googleMapsLink = googleMapsLink;
        return this;
    }

    public void setGoogleMapsLink(String googleMapsLink) {
        this.googleMapsLink = googleMapsLink;
    }

    public String getTripAdvisorLink() {
        return tripAdvisorLink;
    }

    public Restaurant tripAdvisorLink(String tripAdvisorLink) {
        this.tripAdvisorLink = tripAdvisorLink;
        return this;
    }

    public void setTripAdvisorLink(String tripAdvisorLink) {
        this.tripAdvisorLink = tripAdvisorLink;
    }

    public String getWebPageLink() {
        return webPageLink;
    }

    public Restaurant webPageLink(String webPageLink) {
        this.webPageLink = webPageLink;
        return this;
    }

    public void setWebPageLink(String webPageLink) {
        this.webPageLink = webPageLink;
    }

    public Location getIdLocation() {
        return idLocation;
    }

    public Restaurant idLocation(Location location) {
        this.idLocation = location;
        return this;
    }

    public void setIdLocation(Location location) {
        this.idLocation = location;
    }

    public User getUser() {
        return user;
    }

    public Restaurant user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Restaurant restaurant = (Restaurant) o;
        if (restaurant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", googleMapsLink='" + getGoogleMapsLink() + "'" +
            ", tripAdvisorLink='" + getTripAdvisorLink() + "'" +
            ", webPageLink='" + getWebPageLink() + "'" +
            "}";
    }
}
