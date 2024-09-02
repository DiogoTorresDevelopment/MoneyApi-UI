import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent {

  persons = [
    { personName: 'Diogo', active: true, address: {
        street: 'Rua Maringa',
        addressNumber: '622',
        complement: 'Casa amarela',
        district: 'Centro',
        zipCode: '85640-000',
        city: 'Ampére',
        addressState: 'PR',
      }
    },{ personName: 'Pedro', active: true, address: {
        street: 'Rua XV Novembro',
        addressNumber: '242',
        complement: 'Casa',
        district: 'Nossa Sra das Graças',
        zipCode: '85640-000',
        city: 'Ampére',
        addressState: 'PR',
      }
    },{ personName: 'Paulo', active: true, address: {
        street: 'Rua Guaira',
        addressNumber: '618',
        complement: 'Apto 20',
        district: 'Centro',
        zipCode: '85640-000',
        city: 'Ampére',
        addressState: 'PR',
      }
    }
  ];


}
