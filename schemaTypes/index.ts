import {type SchemaTypeDefinition} from 'sanity'

import {blockContentType} from './blockContentType'
import {hotelCategoryType} from './hotelCategoryType'
import {blogType} from './collections/blogType'
import {authorType} from './authorType'
import {hotelType} from './collections/hotelType'
import {editionType} from './editionType'
import {rankingType} from './rankingType'
import {homeType} from './pages/home'
import {aboutUsType} from './pages/aboutUs'
import {partnersType} from './pages/partners'
import {eventsType} from './collections/eventsType'
import {navbarType} from './navigation/navbarType'
import {footerType} from './navigation/footerType'
import heroSlider from './componets/heroSlider'
import partnerLogo from './componets/partnerLogo'
import textQuote from './componets/textQuote'
import businessLeisure from './componets/business-leisure'
import successStory from './componets/successStory'
import RankingMitRelevanz from './componets/Ranking-mit-Relevanz'
import specialEdition from './componets/specialEdition'
import Events from './componets/101-Events'
import imageQuote from './componets/imageQuote'
import exclusiveEvents from './componets/exclusiveEvents'
import newsletter from './componets/newsletter'
import Hotelmomente from './componets/Hotelmomente'
import dieInstagram from './componets/dieInstagram'
import dasBush from './componets/dasBush'
import Utr from './componets/Utr'
import testimonials from './componets/testimonials'
import dieBesten from './componets/dieBesten'
import BoardofDas from './componets/BoardofDas'
import principles from './componets/principles'
import shapingFuture from './componets/shapingFuture'
import Mabstab from './componets/Mabstab'
import Hotels from './componets/Hotels'
import location from './componets/location'
import heroAbout from './componets/heroAbout'
import {allHotelsType} from './pages/allHotels'
import allHotelsSlider from './componets/allHotelsSlider'
import specialEditionHero from './componets/specialEditionHero'
import {specialEditionHotels} from './pages/specialEditionHotels'
import hotelCollection from './componets/hotelCollection'
import imageSection from './componets/imageSection'
import pageTitle from './componets/pageTitle'
import strategischePartner from './componets/strategischePartner'
import medienPartner from './componets/medienPartner'
import partner from './componets/partner'
import werde101 from './componets/werde-101'
import blogCollection from './componets/blogCollection'
import blogPageTitle from './componets/blogPageTitle'
import allBlogs from './pages/allBlogs'
import SpecialHotels from './componets/SpecialHotels'
import {addressType} from './componets/addressType'
import premiumPartner from './componets/premiumPartner'
import categoryType from './categoryType'
import imagesType from './collections/imageType'
import achivementType from './collections/achivementType'
import {cityType} from './componets/cityType'
import countryType from './componets/countryType'
import {allEventsType} from './pages/allEvents'
import eventsHero from './componets/eventsHero'
import eventsCollection from './componets/eventsCollection'
import { eventsTags } from './collections/eventsTags'
export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    hotelType,
    eventsType,
    editionType,
    rankingType,
    blockContentType,
    hotelCategoryType,
    blogType,
    authorType,
    homeType,
    aboutUsType,
    partnersType,
    navbarType,
    footerType,
    heroSlider,
    partnerLogo,
    premiumPartner,
    textQuote,
    businessLeisure,
    successStory,
    RankingMitRelevanz,
    specialEdition,
    Events,
    imageQuote,
    exclusiveEvents,
    newsletter,
    Hotelmomente,
    dieInstagram,
    dasBush,
    Utr,
    testimonials,
    dieBesten,
    BoardofDas,
    principles,
    shapingFuture,
    Mabstab,
    Hotels,
    location,
    heroAbout,
    allHotelsType,
    allHotelsSlider,
    specialEditionHero,
    specialEditionHotels,
    hotelCollection,
    imageSection,
    pageTitle,
    strategischePartner,
    medienPartner,
    partner,
    werde101,
    allBlogs,
    blogCollection,
    blogPageTitle,
    SpecialHotels,
    addressType,
    categoryType,
    imagesType,
    achivementType,
    cityType,
    countryType,
    allEventsType,
    eventsHero,
    eventsCollection,
    eventsTags,
    ],
}
