import type {StructureResolver} from 'sanity/structure'

export const partnersStructure: StructureResolver = (S) => S.list().title('Sellf Partner Network').items([
  S.listItem().title('Sayfa Ayarları').child(S.document().schemaType('partnersSettings').documentId('partnersSettings')),
  S.divider(),
  S.documentTypeListItem('networkPartner').title('Partnerler'),
  S.documentTypeListItem('partnerCampaign').title('Kampanyalar & Avantajlar'),
])
