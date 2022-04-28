package cl.mti.wikidataApi.repository;


import cl.mti.wikidataApi.model.LocalEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WikidataLocalRepository extends JpaRepository<LocalEnt,String> {


}
