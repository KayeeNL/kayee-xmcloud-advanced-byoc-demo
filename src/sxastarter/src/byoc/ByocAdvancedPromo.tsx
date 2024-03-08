import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface ByocPromoProps {
  imageUrl: string;
  text: string;
  url: string;
  urlText: string;
  styling: {
    spacing: string;
    addhighlight: string;
    contentalignment: string;
    promo: string[];
    image: string[];
    common: string[];
  };
}

export const ByocAdvancedPromo = (props: ByocPromoProps): JSX.Element => {
  const promoCssClasses = ConvertToCssClasses(props.styling.promo);
  const imageCssClasses = ConvertToCssClasses(props.styling.image);
  const commonCssClasses = ConvertToCssClasses(props.styling.common);
  console.log(props.styling);
  return (
    <div
      className={`component promo col-12 ${props.styling?.spacing} ${props.styling?.addhighlight} ${props.styling?.contentalignment} ${promoCssClasses} ${imageCssClasses} ${commonCssClasses}`}
    >
      <div className="component-content">
        <div className="field-promoicon">
          {props.imageUrl && <img alt="Kayee" width="2000" height="1116" src={props.imageUrl} />}
        </div>
        <div className="promo-text">
          <div>
            <div className="field-promotext">
              <div>
                <p>{props.text}</p>
              </div>
            </div>
          </div>
          {props.url && (
            <div className="field-promolink">
              <a href={props.url} title={props.urlText} target="_blank">
                {props.urlText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FEAAS.External.registerComponent(ByocAdvancedPromo, {
  name: 'ByocAdvancedPromo',
  title: 'BYOC Advanced Promo',
  description: 'BYOC Advanced Promo description',
  thumbnail:
    'http://xmcloudcm.localhost/-/media/Project/Kayee/shared/kayee-blogpost-15x-sitecore-mvp-award-2024.png?h=1116&amp;iar=0&amp;w=2000&amp;hash=E2C0DDB5A74094A79E34C2321845F27C',
  group: 'BYOC - Promos',
  definitions: {
    spacing: {
      type: 'string',
      title: 'SPACING',
      enum: ['', 'indent-top', 'indent-bottom', 'indent'],
    },
    addhighlight: {
      type: 'string',
      title: 'ADD HIGHLIGHT',
      enum: ['', 'highlighted-left', 'highlighted-right', 'highlighted-top', 'highlighted-bottom'],
    },
    contentalignment: {
      type: 'string',
      title: 'CONTENT ALIGNMENT',
      enum: ['', 'position-left', 'position-center', 'position-right'],
    },
  },
  properties: {
    imageUrl: {
      type: 'string',
      title: 'Image Url',
      description:
        'Please fill in the correct url to the image that should be displayed in the promo',
    },
    text: {
      type: 'string',
      title: 'Text',
      description: 'Please fill in the text for the promo',
    },
    url: {
      type: 'string',
      title: 'Url',
      description: 'Please fill in the url that the button should navigate to',
    },
    urlText: {
      type: 'string',
      title: 'Url Text',
      description: 'Please fill in the text that should be displayed on the button',
    },
    styling: {
      type: 'object',
      title: 'Styling',
      properties: {
        spacing: {
          $ref: '#/definitions/spacing',
        },
        addhighlight: {
          $ref: '#/definitions/addhighlight',
        },
        contentalignment: {
          $ref: '#/definitions/contentalignment',
        },
        promo: {
          type: 'array',
          title: 'PROMO',
          items: {
            type: 'string',
            enum: ['Promo hero', 'Promo shadow', 'Attach link to bottom'],
          },
          uniqueItems: true,
        },
        image: {
          type: 'array',
          title: 'IMAGE',
          items: {
            type: 'string',
            enum: ['Image default size'],
          },
          uniqueItems: true,
        },
        common: {
          type: 'array',
          title: 'COMMON',
          items: {
            type: 'string',
            enum: ['No borders', 'Button link style'],
          },
          uniqueItems: true,
        },
      },
    },
  },
  ui: {
    text: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Write a great Promo text',
    },
  },
});

interface CssClassMapping {
  [key: string]: string;
}

function ConvertToCssClasses(input: string[]) {
  const classMap: CssClassMapping = {
    'Promo hero': 'promo-hero',
    'Promo shadow': 'promo-shadow',
    'Attach link to bottom': 'absolute-bottom-link',
    'No borders': 'promoted-box',
    'Button link style': 'link-button',
    'Image default size': 'image-default-size',
  };

  return input.map((className) => classMap[className] || '').join(' ');
}
