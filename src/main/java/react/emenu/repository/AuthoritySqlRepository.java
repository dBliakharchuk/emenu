package react.emenu.repository;

import react.emenu.domain.AuthoritySql;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the AuthoritySql entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthoritySqlRepository extends JpaRepository<AuthoritySql, Long> {

    @Query(value = "select distinct authority_sql from AuthoritySql authority_sql left join fetch authority_sql.users",
        countQuery = "select count(distinct authority_sql) from AuthoritySql authority_sql")
    Page<AuthoritySql> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct authority_sql from AuthoritySql authority_sql left join fetch authority_sql.users")
    List<AuthoritySql> findAllWithEagerRelationships();

    @Query("select authority_sql from AuthoritySql authority_sql left join fetch authority_sql.users where authority_sql.id =:id")
    Optional<AuthoritySql> findOneWithEagerRelationships(@Param("id") Long id);

}
