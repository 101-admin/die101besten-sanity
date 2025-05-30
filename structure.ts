import type {StructureBuilder, StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  // Remove the default list items
  return S.list()
    .title('Die 101 besten')
    .items([
      S.listItem()
        .title('Deutschland')
        .child(
          S.list()
            .title('Deutschland Content')
            .items([
              S.listItem()
                .title('Pages')
                .child(
                  S.list()
                    .title('Pages')
                    .items([
                      S.listItem()
                        .title('Homepage')
                        .child(
                          S.documentTypeList('home').filter(
                            '_type == "home" && edition == "deutschland" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('About Us')
                        .child(
                          S.documentTypeList('aboutUs').filter(
                            '_type == "aboutUs" && edition == "deutschland" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Partners')
                        .child(
                          S.documentTypeList('partners').filter(
                            '_type == "partners" && edition == "deutschland" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('AllHotels')
                        .child(
                          S.documentTypeList('allHotels').filter(
                            '_type == "allHotels" && edition == "deutschland"',
                          ),
                        ),
                      S.listItem()
                        .title('Special Edition Hotels')
                        .child(
                          S.documentTypeList('specialEditionHotels').filter(
                            '_type == "specialEditionHotels" && edition == "deutschland"',
                          ),
                        ),
                      S.listItem()
                        .title('AllBlogs')
                        .child(
                          S.documentTypeList('allBlogs').filter(
                            '_type == "allBlogs" && edition == "deutschland" ',
                          ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Collections')
                .child(
                  S.list()
                    .title('Collections')
                    .items([
                      S.listItem()
                        .title('Blogs')
                        .child(
                          S.documentTypeList('blog').filter(
                            '_type == "blog" && edition == "deutschland"',
                          ),
                        ),
                      S.listItem()
                        .title('Events')
                        .child(
                          S.documentTypeList('event').filter(
                            '_type == "event" && edition == "deutschland" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Classic Hotels')
                        .child(
                          S.documentTypeList('hotel')
                            .filter(
                              '_type == "hotel" && edition == "deutschland" && variant == "classic"',
                            )
                            .defaultOrdering([{field: 'ranking.position', direction: 'asc'}]),
                        ),
                      S.listItem()
                        .title('Special Hotels')
                        .child(
                          S.documentTypeList('hotel')
                            .filter(
                              '_type == "hotel" && edition == "deutschland" && variant == "special"',
                            )
                            .defaultOrdering([{field: 'ranking.position', direction: 'asc'}]),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Navigation')
                .child(
                  S.list()
                    .title('Navigation')
                    .items([
                      S.listItem()
                        .title('Navbar')
                        .child(
                          S.documentTypeList('navbar').filter(
                            '_type == "navbar" && edition == "deutschland" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Footer')
                        .child(
                          S.documentTypeList('footer').filter(
                            '_type == "footer" && edition == "deutschland" && language == "de"',
                          ),
                        ),
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .title('DACH')
        .child(
          S.list()
            .title('DACH Content')
            .items([
              S.listItem()
                .title('Pages')
                .child(
                  S.list()
                    .title('Pages')
                    .items([
                      S.listItem()
                        .title('Homepage')
                        .child(
                          S.documentTypeList('home').filter(
                            '_type == "home" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('About Us')
                        .child(
                          S.documentTypeList('aboutUs').filter(
                            '_type == "aboutUs" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Partners')
                        .child(
                          S.documentTypeList('partners').filter(
                            '_type == "partners" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('AllHotels')
                        .child(
                          S.documentTypeList('allHotels').filter(
                            '_type == "allHotels" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('AllBlogs')
                        .child(
                          S.documentTypeList('allBlogs').filter(
                            '_type == "allBlogs" && edition == "dash" && language == "de"',
                          ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Collections')
                .child(
                  S.list()
                    .title('Collections')
                    .items([
                      S.listItem()
                        .title('Blogs')
                        .child(
                          S.documentTypeList('blog').filter(
                            '_type == "blog" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Events')
                        .child(
                          S.documentTypeList('event').filter(
                            '_type == "event" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Hotels')
                        .child(
                          S.documentTypeList('hotel').filter(
                            '_type == "hotel" && edition == "dach" && language == "de"',
                          ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Navigation')
                .child(
                  S.list()
                    .title('Navigation')
                    .items([
                      S.listItem()
                        .title('Navbar')
                        .child(
                          S.documentTypeList('navbar').filter(
                            '_type == "navbar" && edition == "dach" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Footer')
                        .child(
                          S.documentTypeList('footer').filter(
                            '_type == "footer" && edition == "dach" && language == "de"',
                          ),
                        ),
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .title('Schweiz')
        .child(
          S.list()
            .title('Schweiz Content')
            .items([
              S.listItem()
                .title('Pages')
                .child(
                  S.list()
                    .title('Pages')
                    .items([
                      S.listItem()
                        .title('Homepage')
                        .child(
                          S.documentTypeList('home').filter(
                            '_type == "home" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('About Us')
                        .child(
                          S.documentTypeList('aboutUs').filter(
                            '_type == "aboutUs" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Partners')
                        .child(
                          S.documentTypeList('partners').filter(
                            '_type == "partners" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('AllHotels')
                        .child(
                          S.documentTypeList('allHotels').filter(
                            '_type == "allHotels" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('AllBlogs')
                        .child(
                          S.documentTypeList('allBlogs').filter(
                            '_type == "allBlogs" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Collections')
                .child(
                  S.list()
                    .title('Collections')
                    .items([
                      S.listItem()
                        .title('Blogs')
                        .child(
                          S.documentTypeList('blog').filter(
                            '_type == "blog" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Events')
                        .child(
                          S.documentTypeList('event').filter(
                            '_type == "event" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Hotels')
                        .child(
                          S.documentTypeList('hotel').filter(
                            '_type == "hotel" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Navigation')
                .child(
                  S.list()
                    .title('Navigation')
                    .items([
                      S.listItem()
                        .title('Navbar')
                        .child(
                          S.documentTypeList('navbar').filter(
                            '_type == "navbar" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                      S.listItem()
                        .title('Footer')
                        .child(
                          S.documentTypeList('footer').filter(
                            '_type == "footer" && edition == "schweiz" && language == "de"',
                          ),
                        ),
                    ]),
                ),
            ]),
        ),
    ])
}
