import { library } from "@fortawesome/fontawesome-svg-core";
import {fab, faWhatsapp, faFacebookMessenger} from "@fortawesome/free-brands-svg-icons";

function initFontAwesome() {
    library.add(fab, faWhatsapp, faFacebookMessenger);
}

export default initFontAwesome;
