package react.emenu.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Location entity.
 */
public class LocationDTO implements Serializable {

    private Long id;

    private String addressGM;

    private String country;

    private String city;

    private String street;

    private String bilding;

    private Integer postcode;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddressGM() {
        return addressGM;
    }

    public void setAddressGM(String addressGM) {
        this.addressGM = addressGM;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getBilding() {
        return bilding;
    }

    public void setBilding(String bilding) {
        this.bilding = bilding;
    }

    public Integer getPostcode() {
        return postcode;
    }

    public void setPostcode(Integer postcode) {
        this.postcode = postcode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LocationDTO locationDTO = (LocationDTO) o;
        if (locationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), locationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LocationDTO{" +
            "id=" + getId() +
            ", addressGM='" + getAddressGM() + "'" +
            ", country='" + getCountry() + "'" +
            ", city='" + getCity() + "'" +
            ", street='" + getStreet() + "'" +
            ", bilding='" + getBilding() + "'" +
            ", postcode=" + getPostcode() +
            "}";
    }
}
