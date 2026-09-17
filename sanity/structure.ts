import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
            ]),
        ),
      S.listItem()
        .title('Sellf Engage')
        .child(
          S.list()
            .title('Sellf Engage')
            .items([
              S.listItem()
                .title('Sayfa Ayarları')
                .child(S.document().schemaType('engageSettings').documentId('engageSettings')),
              S.divider(),
              S.documentTypeListItem('engageWebinar').title('Webinarlar'),
              S.documentTypeListItem('engageEvent').title('Event & Fuarlar'),
              S.documentTypeListItem('engageShowcase').title('Showcase'),
              S.documentTypeListItem('engageInsight').title('Insight'),
              S.documentTypeListItem('engagePerson').title('Konuşmacılar'),
            ]),
        ),
    ])
