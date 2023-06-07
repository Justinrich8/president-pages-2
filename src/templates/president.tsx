/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding stream document stream document (based on the filter).
 */

 import {
    GetHeadConfig,
    GetPath,
    GetRedirects,
    HeadConfig,
    Template,
    TemplateConfig,
    TemplateProps,
    TemplateRenderProps,
  } from "@yext/pages";
  import * as React from "react";
  import "../index.css";
  
  /**
   * Required when Knowledge Graph Stream is used for a template.
   */
  export const config: TemplateConfig = {
    stream: {
      $id: "president_stream",
      // Specifies the exact data that each generated document will contain. This data is passed in
      // directly as props to the default exported function.
      fields: [
        "id",
        "name",
        "c_photoURL",
        "c_numberOfTerms",
        "c_presidentNumber",
        "c_signedDocument.name",
        "slug"
        ],
      // Defines the scope of entities that qualify for this stream.   
      
      filter: {
        entityTypes: ["ce_wikiBio"],
      },
      // The entity language profiles that documents will be generated for.
      localization: {
        locales: ["en"],
        primary: false,
      },
    },
  };
  
  /**
   * Defines the path that the generated file will live at for production.
   */
  export const getPath: GetPath<TemplateProps> = ({ document }) => {
    return document.name;
  };
  
  /**
   * Defines a list of paths which will redirect to the path created by getPath.
   */
  export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
    return [`index-old/${document.id.toString()}`];
  };
  
  /**
   * This allows the user to define a function which will take in their template
   * data and produce a HeadConfig object. When the site is generated, the HeadConfig
   * will be used to generate the inner contents of the HTML document's <head> tag.
   * This can include the title, meta tags, script tags, etc.
   */
  export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
    relativePrefixToRoot,
    path,
    document,
  }): HeadConfig => {
    return {
      title: document.name,
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
    };
  };
  
  /**
   * This is the main template. It can have any name as long as it's the default export.
   * The props passed in here are the direct stream document defined by `config`.
   */
   const EntityPage: Template<TemplateRenderProps> = ({ document }) => {
    const { name, c_photoURL, c_numberOfTerms, c_presidentNumber, c_signedDocument} = document;
  
    return (
        <div className="flex flex-col items-center bg-gray-100 p-4">
          <div className="mb-8">
            <h2 className="font-bold text-2xl">{name}</h2>
            <ul className="list-disc pl-4">
              <li>President Number: {c_presidentNumber}</li>
              <li>Number of Terms: {c_numberOfTerms}</li>
            </ul>
          </div>
    
          <div className="grid grid-cols-3 gap-4">
            {c_signedDocument &&
              c_signedDocument.map((document: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <h3 className="font-bold text-lg mb-2">{document.title}</h3>
                  <p>{document.description}</p>
                </div>
              ))}
          </div>
    
          <div className="mt-8">
            <img src={c_photoURL} alt="President" className="w-48 h-auto" />
          </div>
        </div>
      );
    };
    
  export default EntityPage;
  