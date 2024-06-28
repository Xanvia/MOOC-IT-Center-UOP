import React from "react";

const Note: React.FC = () => {
  return (
    <div>
      <h2>Note Component</h2>
      <div className="py-14 px-3 w-2/3  text-left bg-primary_light">
        <div className="space-y-2">
          <div className="pt-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit lacus,
              interdum volutpat cursus vivamus tellus vestibulum lacinia.
              Maecenas non magna erat faucibus iaculis vivamus, sagittis aliquet
              quis diam risus ante, rhoncus felis suscipit nibh vestibulum.
              Accumsan feugiat orci ad est diam scelerisque volutpat laoreet
              venenatis at potenti pulvinar ante habitant, sem duis etiam
              senectus ullamcorper vestibulum ultricies libero augue turpis
              neque semper. Convallis ullamcorper nostra aliquet ligula varius
              non blandit magna nam, duis diam donec faucibus urna congue
              sollicitudin metus vulputate, scelerisque velit felis vel cursus
              penatibus et dictumst. Curabitur purus ante felis fringilla
              vulputate pretium sagittis ad, at mattis commodo nisi leo sem
              interdum libero, nec etiam venenatis mollis odio habitasse
              egestas. Nulla eget lacus tortor bibendum hac id fringilla, tempor
              himenaeos pulvinar habitant ad sagittis, maecenas ridiculus quis
              quisque cum ultrices. Cubilia nam arcu ante rutrum quisque mollis
              dui fringilla sollicitudin ultrices nulla suscipit at, neque ut
              eget id porta nunc gravida pharetra praesent mus auctor.
            </p>

            <br/>

            <p>
              {" "}
              Torquent ad dictum facilisi vel neque justo libero lobortis,
              cursus nascetur ligula a vivamus curabitur morbi vehicula
              scelerisque, sodales lacus sociosqu class ante accumsan quam
              nostra, egestas senectus tincidunt diam elementum habitant
              suspendisse. Rutrum inceptos duis molestie risus litora sapien
              tortor malesuada, at nibh tristique quis porttitor egestas
              accumsan eleifend sed, eu habitant hac eget commodo proin morbi.
              Pharetra consequat nisl lobortis dictumst facilisis interdum,
              semper fames libero tellus phasellus integer, fringilla vel
              pretium tempus congue. Nulla porta velit volutpat nec habitant
              mauris, himenaeos imperdiet magna neque pellentesque aenean,
              inceptos cubilia natoque justo aptent. Proin risus sodales arcu
              magna placerat lobortis consequat imperdiet cursus habitant
              tristique orci eleifend torquent dignissim, vivamus phasellus eu
              aenean tellus aptent sem maecenas leo dui integer non erat velit.
              Taciti potenti torquent conubia varius quam porta ultricies id,
              viverra sed proin cum molestie dis sapien, lobortis aliquam nec
              ridiculus felis ultrices platea. Phasellus parturient suscipit
              interdum cubilia scelerisque imperdiet dictumst enim leo, nostra
              consequat sagittis taciti sem inceptos molestie ullamcorper
              pellentesque aliquam, elementum sollicitudin hac ad quis fusce
              cursus a.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
