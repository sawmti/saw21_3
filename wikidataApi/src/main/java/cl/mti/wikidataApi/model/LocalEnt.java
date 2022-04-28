package cl.mti.wikidataApi.model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class LocalEnt {
    @Id
    private String Id;
    private String modified;
    private String description;
    private String updatedDate;
}
