package react.emenu.repository;

import react.emenu.domain.IngredientToDish;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IngredientToDish entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IngredientToDishRepository extends JpaRepository<IngredientToDish, Long>, JpaSpecificationExecutor<IngredientToDish> {

}
