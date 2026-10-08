export const policies = {
  shipping: {
    title: 'Shipping information', eyebrow: 'The journey to your desk', introduction: 'A clear look at the shipping options and totals shown at checkout.',
    sections: [
      { heading: 'Shipping estimates', paragraphs: ['For United States addresses, standard shipping is estimated at $6.95, or free for a merchandise subtotal of $100 or more. Express shipping is estimated at $12.95. Your selected option is included in the checkout total.'] },
      { heading: 'Your address', paragraphs: ['Review the street address, city, state, and ZIP code before continuing. The checkout currently supports United States addresses.'] },
      { heading: 'Delivery information', paragraphs: ['Carrier services, processing schedules, and delivery times have not been published. No delivery date is specified by the checkout.'] },
    ],
  },
  returns: {
    title: 'Returns information', eyebrow: 'Room for a change of mind', introduction: 'A few helpful details about changing your selection.',
    sections: [
      { heading: 'Before checkout', paragraphs: ['Open your cart to adjust quantities or remove any item. You can continue exploring the collection before completing your selection.'] },
      { heading: 'Product information', paragraphs: ['Read the description and details on each product page. Photographs may include props or accessories; the product details identify these where applicable.'] },
      { heading: 'Return arrangements', paragraphs: ['A return window, return address, and refund process have not been published. Please refer to Help & contact for the support information currently available.'] },
    ],
  },
  privacy: {
    title: 'Privacy policy', eyebrow: 'Clear by intention', introduction: 'How Engifto handles information in your browser.',
    sections: [
      { heading: 'Your cart', paragraphs: ['The storefront uses browser local storage to keep product IDs and quantities. These records contain no contact or payment information. You can remove them by clearing your cart or clearing this site’s browser data.'] },
      { heading: 'Checkout information', paragraphs: ['Contact and shipping fields are validated in your browser. Engifto does not submit these fields to a server or store them in local storage or session storage. Your browser may independently provide autofill or retain form history depending on your settings.', 'After checkout, browser session storage holds product IDs, quantities, a shipping choice, a random reference, and a timestamp. This summary contains no contact or address information. It normally lasts for the browser-tab session and can be removed through browser settings.'] },
      { heading: 'Hosting and external links', paragraphs: ['The hosting provider may process technical request data, such as IP addresses, to deliver and secure the website. The storefront does not include analytics scripts, advertising trackers, or marketing forms.', 'Product photographs and fonts are served from this website. Following a photography-source or license link takes you to that provider’s website and its privacy practices.'] },
      { heading: 'Policy updates', paragraphs: ['This policy will be updated when the website’s data handling changes. Any new account, email, payment, or order service must be reflected here.'] },
    ],
  },
  terms: {
    title: 'Terms of use', eyebrow: 'The details, plainly stated', introduction: 'The details to know while exploring Engifto.',
    sections: [
      { heading: 'The collection', paragraphs: ['Engifto presents paper goods, desk lighting, and workspace accents. Product pages include a description, price in US dollars, and details for each item. The collection and its information may change.'] },
      { heading: 'Your selections', paragraphs: ['The cart keeps product IDs and quantities in this browser. Checkout creates a selection summary in the current browser-tab session. Clearing site data or closing the session may remove these records.'] },
      { heading: 'Photography', paragraphs: ['Stock photographs are sourced from Burst by Shopify under the licenses linked in our photography credits. Photos can include styling accessories. No affiliation or endorsement by Shopify or the photographers is implied.'] },
      { heading: 'Information and privacy', paragraphs: ['Please review the shipping, returns, and privacy pages for details relevant to the website. Contact & company information brings these resources together.'] },
    ],
  },
};
