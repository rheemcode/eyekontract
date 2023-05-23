
export const APPURL = "https://eyekontact.com.ng";

//TODO: add max values
export declare interface WhoWeAreSectionState {
    heading: string;
    attention: string;
    description: string;
    adsPlaced: string;
    monthlyReach: string;
    citiesCovered: string;
};

const whoWeAreDefault: WhoWeAreSectionState = {
    heading: "WE CREATE MASS PUBLIC'S  EYE",
    attention: "ATTENTION",
    description: "We are a value driven organization poised to \n \
                  deliver the most unique set of eyes on your brand. \n \
                  Our goal is to exponentially increase the reach of  \n \
                  awareness of your brand.",
    adsPlaced: "Ads Placed",
    monthlyReach: "Monthly Reach",
    citiesCovered: "Cities Covered"
}

export declare interface ServiceSectionState {
    heading: string;
    heading2: string;
}

const serviceSectionDefault: ServiceSectionState = {
    heading: "WHAT WE DO",
    heading2: "OUR SERVICES"
}

export declare interface ExpertSectionState {
    heading: string;
    heading2: string
    description: string;
    design: string;
    strategy: string;
    planning: string;
    image: string;
    image2: string;
}

const expertSectionDefaultState: ExpertSectionState = {
    heading: "WE ARE EXPERTS IN OUT OF HOME",
    heading2: "ADVERTISING",
    description: "Providing expert assistance with outdoor advertising for over two decades. We can assist your brand with:",
    design: "Design",
    strategy: "Strategy",
    planning: "Planning",
    image: `https://eyekontact.com.ng/uploads/images/teams.jpg`,
    image2: `https://eyekontact.com.ng/uploads/images/expert.jpg`
}

export declare interface TestimonialSectionState {
    heading: string;
    heading2: string
}

const testimonialDefaultState: TestimonialSectionState = {
    heading: "CLIENTS",
    heading2: "TESTIMONIAL"
}

export declare interface BlogInsightsSectionState {
    heading: string;
    heading2: string;
}

const blogInsightDefaultState: BlogInsightsSectionState = {
    heading: "WHATS GOING ON",
    heading2: "LATEST NEWS"
}

export declare interface BrandNoticeSectionState {
    heading: string;
    heading2: string;
    imageBg: string;
}

const brandNoticeDefaultState: BrandNoticeSectionState = {
    heading: "WANT TO GAIN BRAND AWARENESS",
    heading2: "Contact us to see how we can help.",
    imageBg: `https://eyekontact.com.ng/uploads/images/victoriaIsland.jpg`
}

export declare interface HomeState {
    landingHeader1: string;
    landingHeader2: string;
    landingBg1: string;
    landingBg2: string;
    landingServiceLink1: string;
    landingServiceLink2: string;
    whoWeAreSection: WhoWeAreSectionState;
    servicesSection: ServiceSectionState;
    expertSection: ExpertSectionState;
    testimonialSection: TestimonialSectionState;
    blogInsightsSection: BlogInsightsSectionState;
    brandNoticeSection: BrandNoticeSectionState;
};

const homeStateDefault: HomeState = {
    landingHeader1: "Eyekontact Outdoor Advertising",
    landingBg1: `https://eyekontact.com.ng/uploads/images/lekki.jpg`,
    landingServiceLink1: "View Our Services",
    landingHeader2: "We Project Exceptional Brands",
    landingBg2: `https://eyekontact.com.ng/uploads/images/victoriaIsland.jpg`,
    landingServiceLink2: "View Our Services",
    whoWeAreSection: whoWeAreDefault,
    servicesSection: serviceSectionDefault,
    testimonialSection: testimonialDefaultState,
    blogInsightsSection: blogInsightDefaultState,
    expertSection: expertSectionDefaultState,
    brandNoticeSection: brandNoticeDefaultState
}

export declare interface AboutUsState {
    landingBg: string;
    heading: string;
    description: string;
    description2: string;
    description3: string;
    missionHeading: string;
    missionDescription: string;
    coreValuesHeading: string;
    coreValuesDescription: string;
    image: string;
}

const aboutUsDefault: AboutUsState = {
    landingBg: `https://eyekontact.com.ng/uploads/images/gantry.jpg`,
    heading: "WHO WE ARE",
    description: "EyeKontact Limited is one of Nigeria's leading outdoor advertising companies, We are certified by LASAA (Lagos State Signage and Advertising Agency) and are members of APCON (Advertising Practitioners Council of Nigeria).",
    description2: "We specialize in out-of-home advertising and provide solutions for our customers in the form of digital LED & static billboards, wall drapes, transit signages and lamp-poles advert displays. Our company was incorporated in December 2007 with the corporate affairs commission of Nigeria with the registration no: RC 722750 and we have a broad corporate reach of over 25 locations across Nigeria.",
    description3: "We provide our clients with strategic brand awareness insights, creative support and channels to deliver their brand message from start to finish.",
    missionHeading: "MISSION",
    missionDescription: "To create bond and affinity for brands through provision of excellent innovative and environmental friendly out-of-home advertising services",
    coreValuesHeading: "CORE VALUES",
    coreValuesDescription: "We are driven by the need to consistently outdo our best accomplishments and to deliver premium service to all our clients.",
    image: `https://eyekontact.com.ng/uploads/images/billboard2.jpg`

}

export declare interface AboutState {
    whoWeAreSection: AboutUsState;
    expertSection: ExpertSectionState;
    testimonialSection: TestimonialSectionState;
    brandNoticeSection: BrandNoticeSectionState;
}

const aboutDefaultState: AboutState = {
    whoWeAreSection: aboutUsDefault,
    expertSection: expertSectionDefaultState,
    testimonialSection: testimonialDefaultState,
    brandNoticeSection: brandNoticeDefaultState
}

export declare interface ContactFormState {
    heading: string;
    addressHeading: string;
    addressDescription: string;
    phoneHeading: string;
    phoneDescription: string;
    officeHeading: string;
    officeDescription: string;
    emailHeading: string;
    emailDescription: string;
}

const contactFormDefaultState: ContactFormState = {
    heading: "GET IN TOUCH",
    addressHeading: "ADDRESS",
    addressDescription: "49 Adeniyi Jones Avenue, Ikeja - Lagos, Nigeria",
    phoneHeading: "PHONE",
    phoneDescription: "+234 802 381 7414",
    officeHeading: "OFFICE TIME",
    officeDescription: "Monday - Friday",
    emailHeading: "EMAIL US",
    emailDescription: "info@eyekontact.com.ng"
}

export declare interface ContactState {
    landingBg: string;
    contactFormState: ContactFormState;
}

const contactDefaultState: ContactState = {
    landingBg: `https://eyekontact.com.ng/uploads/images/walldrape.jpg`,
    contactFormState: contactFormDefaultState
}

export declare interface WorkWithUsState {
    heading: string;
    heading2: string;
    phone: string;
    email: string;
    address: string
}

const workWithUsDefaultState: WorkWithUsState = {
    heading: "WANT TO WORK WITH US?",
    heading2: "CONTACT US",
    phone: "234 802 381 7414",
    email: "info@eyekontact.com.ng",
    address: "49 Adeniyi Jones Avenue, Ikeja - Lagos, Nigeria"
}

export declare interface ServiceState {
    landingBg: string;
    workWithUsSectionState: WorkWithUsState
}

export declare interface ProductsState {
    landingBg: string;
    workWithUsSectionState: WorkWithUsState
}

export declare interface BlogState {
    landingBg: string;
    workWithUsSectionState: WorkWithUsState
}

const serviceStateDefault: ServiceState = {
    landingBg: `https://eyekontact.com.ng/uploads/images/led_billboard.jpg`,
    workWithUsSectionState: workWithUsDefaultState
}

const productsStateDefault: ProductsState = {
    landingBg: `https://eyekontact.com.ng/uploads/images/led_billboard.jpg`,
    workWithUsSectionState: workWithUsDefaultState
}

const blogStateDefault: BlogState = {
    landingBg: `https://eyekontact.com.ng/uploads/images/gantry.jpg`,
    workWithUsSectionState: workWithUsDefaultState
}

const tacDefault = `<h1 className="text-center text-3xl font-bold mt-6"><strong>Terms and Conditions</strong></h1>

<p className="mt-2">Welcome to Eyekontact!</p>

<p className="mt-2">These terms and conditions outline the rules and regulations for the use of Eyekontact's Website, located at https://www.eyekontact.com.ng.</p>

<p className="mt-2">By accessing this website we assume you accept these terms and conditions. Do not continue to use Eyekontact if you do not agree to take all of the terms and conditions stated on this page.</p>

<p className="mt-2">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Cookies</strong></h2>

<p className="mt-2">We employ the use of cookies. By accessing Eyekontact, you agreed to use cookies in agreement with the Eyekontact's Privacy Policy. </p>

<p className="mt-2">Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>License</strong></h2>

<p className="mt-2">Unless otherwise stated, Eyekontact and/or its licensors own the intellectual property rights for all material on Eyekontact. All intellectual property rights are reserved. You may access this from Eyekontact for your own personal use subjected to restrictions set in these terms and conditions.</p>

<p className="mt-2">You must not:</p>
<ul>
    <li>Republish material from Eyekontact</li>
    <li>Sell, rent or sub-license material from Eyekontact</li>
    <li>Reproduce, duplicate or copy material from Eyekontact</li>
    <li>Redistribute content from Eyekontact</li>
</ul>

<p className="mt-2">This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.privacypolicies.com/blog/sample-terms-conditions-template/">Terms And Conditions Template</a>.</p>

<p className="mt-2">Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Eyekontact does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Eyekontact,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Eyekontact shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

<p className="mt-2">Eyekontact reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

<p className="mt-2">You warrant and represent that:</p>

<ul>
    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
</ul>

<p className="mt-2">You hereby grant Eyekontact a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Hyperlinking to our Content</strong></h2>

<p className="mt-2">The following organizations may link to our Website without prior written approval:</p>

<ul>
    <li>Government agencies;</li>
    <li>Search engines;</li>
    <li>News organizations;</li>
    <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
</ul>

<p className="mt-2">These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

<p className="mt-2">We may consider and approve other link requests from the following types of organizations:</p>

<ul>
    <li>commonly-known consumer and/or business information sources;</li>
    <li>dot.com community sites;</li>
    <li>associations or other groups representing charities;</li>
    <li>online directory distributors;</li>
    <li>internet portals;</li>
    <li>accounting, law and consulting firms; and</li>
    <li>educational institutions and trade associations.</li>
</ul>

<p className="mt-2">We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Eyekontact; and (d) the link is in the context of general resource information.</p>

<p className="mt-2">These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

<p className="mt-2">If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Eyekontact. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

<p className="mt-2">Approved organizations may hyperlink to our Website as follows:</p>

<ul>
    <li>By use of our corporate name; or</li>
    <li>By use of the uniform resource locator being linked to; or</li>
    <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
</ul>

<p className="mt-2">No use of Eyekontact's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>iFrames</strong></h2>

<p className="mt-2">Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Content Liability</strong></h2>

<p className="mt-2">We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Your Privacy</strong></h2>

<p className="mt-2">Please read Privacy Policy</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Reservation of Rights</strong></h2>

<p className="mt-2">We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Removal of links from our website</strong></h2>

<p className="mt-2">If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

<p className="mt-2">We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

<h2 className="text-center text-2xl font-bold mt-3"><strong>Disclaimer</strong></h2>

<p className="mt-2">To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

<ul>
    <li>limit or exclude our or your liability for death or personal injury;</li>
    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
</ul>

<p className="mt-2">The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

<p className="mt-2">As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>`

const privacyPolicyDefault = `<h1 className="text-center text-3xl font-bold mt-6">Privacy Policy</h1>
<p className="mt-2">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
<p className="mt-2">We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.privacypolicies.com/blog/privacy-policy-template/" target="_blank">Privacy Policy Template</a>.</p>
<h1 className="text-center text-3xl font-bold mt-6">Interpretation and Definitions</h1>
<h2 className=" text-center text-2xl font-bold mt-3">Interpretation</h2>
<p className="mt-2">The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h2 className=" text-center text-2xl font-bold mt-3">Definitions</h2>
<p className="mt-2">For the purposes of this Privacy Policy:</p>
<ul>
    <li>
        <p className="mt-2"><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Eyekontact, 49 Adeniyi Jones Avenue, Ikeja - Lagos, Nigeria.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Country</strong> refers to:  Nigeria</p>
    </li>
    <li>
        <p className="mt-2"><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Service</strong> refers to the Website.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
    </li>
    <li>
        <p className="mt-2"><strong>Website</strong> refers to Eyekontact, accessible from <a href="https://eyekontact.com.ng" rel="external nofollow noopener" target="_blank">https://eyekontact.com.ng</a></p>
    </li>
    <li>
        <p className="mt-2"><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
    </li>
</ul>
<h1 className="text-center text-3xl font-bold mt-6">Collecting and Using Your Personal Data</h1>
<h2 className=" text-center text-2xl font-bold mt-3">Types of Data Collected</h2>
<h3 className="text-xl font-bold mt-3">Personal Data</h3>
<p className="mt-2">While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
<ul>
    <li>
        <p className="mt-2">Email address</p>
    </li>
    <li>
        <p className="mt-2">First name and last name</p>
    </li>
    <li>
        <p className="mt-2">Phone number</p>
    </li>
    <li>
        <p className="mt-2">Usage Data</p>
    </li>
</ul>
<h3 className="text-xl font-bold mt-3">Usage Data</h3>
<p className="mt-2">Usage Data is collected automatically when using the Service.</p>
<p className="mt-2">Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
<p className="mt-2">When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
<p className="mt-2">We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
<h3 className="text-xl font-bold mt-3">Tracking Technologies and Cookies</h3>
<p className="mt-2">We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
<ul>
    <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
    <li><strong>Flash Cookies.</strong> Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read &quot;Where can I change the settings for disabling, or deleting local shared objects?&quot; available at <a href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_" rel="external nofollow noopener" target="_blank">https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_</a></li>
    <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
</ul>
<p className="mt-2">Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies: <a href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking" target="_blank">Cookies by PrivacyPolicies Generator</a>.</p>
<p className="mt-2">We use both Session and Persistent Cookies for the purposes set out below:</p>
<ul>
    <li>
        <p className="mt-2"><strong>Necessary / Essential Cookies</strong></p>
        <p className="mt-2">Type: Session Cookies</p>
        <p className="mt-2">Administered by: Us</p>
        <p className="mt-2">Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
        <p className="mt-2">Type: Persistent Cookies</p>
        <p className="mt-2">Administered by: Us</p>
        <p className="mt-2">Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
    </li>
    <li>
        <p className="mt-2"><strong>Functionality Cookies</strong></p>
        <p className="mt-2">Type: Persistent Cookies</p>
        <p className="mt-2">Administered by: Us</p>
        <p className="mt-2">Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
    </li>
</ul>
<p className="mt-2">For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
<h2 className=" text-center text-2xl font-bold mt-3">Use of Your Personal Data</h2>
<p className="mt-2">The Company may use Personal Data for the following purposes:</p>
<ul>
    <li>
        <p className="mt-2"><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
    </li>
    <li>
        <p className="mt-2"><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
    </li>
    <li>
        <p className="mt-2"><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
    </li>
    <li>
        <p className="mt-2"><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
    </li>
    <li>
        <p className="mt-2"><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
    </li>
    <li>
        <p className="mt-2"><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
    </li>
    <li>
        <p className="mt-2"><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
    </li>
    <li>
        <p className="mt-2"><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
    </li>
</ul>
<p className="mt-2">We may share Your personal information in the following situations:</p>
<ul>
    <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
    <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
    <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
    <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
    <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
    <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
</ul>
<h2 className=" text-center text-2xl font-bold mt-3">Retention of Your Personal Data</h2>
<p className="mt-2">The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
<p className="mt-2">The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
<h2 className=" text-center text-2xl font-bold mt-3">Transfer of Your Personal Data</h2>
<p className="mt-2">Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
<p className="mt-2">Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
<p className="mt-2">The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
<h2 className=" text-center text-2xl font-bold mt-3">Disclosure of Your Personal Data</h2>
<h3 className="text-xl font-bold mt-3">Business Transactions</h3>
<p className="mt-2">If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
<h3 className="text-xl font-bold mt-3">Law enforcement</h3>
<p className="mt-2">Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
<h3 className="text-xl font-bold mt-3">Other legal requirements</h3>
<p className="mt-2">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
<ul>
    <li>Comply with a legal obligation</li>
    <li>Protect and defend the rights or property of the Company</li>
    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
    <li>Protect the personal safety of Users of the Service or the public</li>
    <li>Protect against legal liability</li>
</ul>
<h2 className=" text-center text-2xl font-bold mt-3">Security of Your Personal Data</h2>
<p className="mt-2">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
<h1 className="text-center text-3xl font-bold mt-6">Children's Privacy</h1>
<p className="mt-2">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
<p className="mt-2">If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
<h1 className="text-center text-3xl font-bold mt-6">Links to Other Websites</h1>
<p className="mt-2">Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
<p className="mt-2">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
<h1 className="text-center text-3xl font-bold mt-6">Changes to this Privacy Policy</h1>
<p className="mt-2">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
<p className="mt-2">We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
<p className="mt-2">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
<h1 className="text-center text-3xl font-bold mt-6">Contact Us</h1>
<p className="mt-2">If you have any questions about this Privacy Policy, You can contact us:</p>
<ul>
    <li>
        <p className="mt-2">By email: info@eyekontact.com.ng</p>
    </li>
    <li>
        <p className="mt-2">By visiting this page on our website: <a href="https://eyekontact.com.ng/contact" rel="external nofollow noopener" target="_blank">https://eyekontact.com.ng/contact</a></p>
    </li>
    <li>
        <p className="mt-2">By phone number: +234 802 381 7414</p>
    </li>
</ul>`

export declare interface CMSState {

    homeState: HomeState;
    aboutState: AboutState;
    contactState: ContactState;
    servicesState: ServiceState;
    productsState: ProductsState;
    blogState: BlogState;
    tac: string;
    privacyPolicy: string;
    footerState: any;
}

export const pageDefaultState: CMSState = {
    homeState: homeStateDefault,
    aboutState: aboutDefaultState,
    contactState: contactDefaultState,
    servicesState: serviceStateDefault,
    productsState: productsStateDefault,
    blogState: blogStateDefault,
    tac: tacDefault,
    privacyPolicy: privacyPolicyDefault,
    footerState: "",
}