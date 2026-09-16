import type {StructureResolver} from 'sanity/structure'

const settingsId = 'engageSettings'

export const engageStructure: StructureResolver = (S) =>
  S.list()
    .title('Sellf Engage')
    .items([
      S.listItem()
        .title('Sayfa Ayarları')
        .child(S.document().schemaType('engageSettings').documentId(settingsId)),
      S.divider(),
      S.documentTypeListItem('engageWebinar').title('Webinarlar'),
      S.documentTypeListItem('engageEvent').title('Event & Fuarlar'),
      S.documentTypeListItem('engageContent').title('Showcase & Insight'),
      S.documentTypeListItem('engageTool').title('Toollar'),
      S.documentTypeListItem('engagePerson').title('Konuşmacılar'),
    ])
