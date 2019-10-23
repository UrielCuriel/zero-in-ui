import React from "react";
import { Card } from "../../lib/src/components/Card";
import { Area } from "../../lib/src/components/Layout";
const Home = () => {
  return (
    <Card>
      <Area area="card-header">
        <h1>Home</h1>
      </Area>
      <Area area="card-body">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
          pariatur consectetur perferendis tempore eligendi, hic tempora
          explicabo ab voluptas exercitationem ut adipisci incidunt natus odit
          vitae fugit maiores accusantium illum.
        </p>
      </Area>
    </Card>
  );
};
export default Home;
