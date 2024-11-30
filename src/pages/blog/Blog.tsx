import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { ScrollPanel } from "primereact/scrollpanel";

const Blog = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "'Roboto', sans-serif" }}>
      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#333",
        }}
      >
        ¡Te damos la bienvenida! Como parte valiosa del personal, tú eres el
        centro de este manual. Esperamos que contenga todo lo que necesitas para
        navegar nuestra historia, procesos y políticas generales.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6rem",
        }}
      >
        <Card
          title="Nuestra Historia"
          style={{
            width: "300px",
            height: "600px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <ScrollPanel style={{ width: "110%", height: "450px" }}>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Ola tuvo sus inicios en la ciudad de Cuenca en 2018, iniciando sus
              sevicios como freelance. La misión era bindar apoyo a los dueños
              de negocios a través de la creación de contenidos para redes
              sociales. Con el transcurso del tiempo, Ola comprendió que el
              éxito de un negocio no se limita únicamente al contenido en redes
              sociales, sino que requiere un respaldo empresaial que abarque los
              procesos intenos específicos de cada comercio. Al integrar dos
              heramientas fundamentales para el crecimiento, el marketing
              digital y la consultoía de negocios, Ola se posiciona para
              garantizar el desarollo exitoso de cualquier empresa. Esta
              combinación estratégica no solo se centra en la visibilidad en
              línea, sino que profundiza en los aspectos intenos que influyen
              directamente en el funcionamiento y crecimiento sostenible de un
              negocio. En el 2020 Ola se constituye como empresa contando como
              más de 10 colaboradores actualmente y con diferentes Depatamentos
              dentro de la organización.
            </p>
            <div
              className="card flex justify-content-center"
              style={{ marginTop: "1rem", borderRadius: "8px" }}
            >
              <Image
                src="https://i.blogs.es/0ca9a6/aa/1366_2000.jpeg"
                preview
                width="250"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </ScrollPanel>
        </Card>

        <Card
          title="Misión"
          style={{
            width: "300px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            La misión de Ola es impulsar el éxito de los negocios al
            proporcionar soluciones integrales que van más allá de la esfera
            digital. Nos dedicamos a comprender las necesidades únicas de cada
            dueño de negocio, ofreciendo un apoyo estratégico que abarca desde
            la creación de contenidos para redes sociales hasta una consultoía
            empresaial profunda.
          </p>
        </Card>

        <Card
          title="Visión"
          style={{
            width: "300px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            En Ola, aspiramos a ser reconocidos por nuestra excelencia en la
            integración de tecnologías emergentes, estrategias de marketing
            avanzadas y asesoramiento empresaial especializado. MANUAL DEL
            PERSONAL CONTENIDO Histoia de la empresa Misión, visión, valores y
            objetivo Manual de procesos Reglamento inteno Buscamos ir más allá
            de las expectativas, liderando el camino hacia el éxito sostenible
            de nuestros clientes.
          </p>
        </Card>

        <Card
          title="Valores"
          style={{
            width: "300px",
            height: "600px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <ScrollPanel style={{ width: "110%", height: "450px" }}>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              <p style={{ fontWeight: "bold" }}>Integridad:</p> Actuamos con
              honestidad y transparencia en todas nuestras interacciones,
              manteniendo la coherencia entre nuestras palabras y acciones.
            </p>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              <p style={{ fontWeight: "bold" }}>Colaboración:</p> Valoramos y
              fomentamos la colaboración intena y extena, reconociendo que el
              éxito se logra mejor cuando trabajamos juntos de manera efectiva.{" "}
            </p>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              <p style={{ fontWeight: "bold" }}>Innovación:</p> Abrazamos la
              creatividad y la búsqueda constante de soluciones innovadoras. Nos
              esfozamos por ser pioneros en la adopción de nuevas tecnologías y
              enfoques que beneficien a nuestros clientes.
            </p>

            <p style={{ lineHeight: "1.6", color: "#555" }}>
              {" "}
              <p style={{ fontWeight: "bold" }}>Orientación al Cliente:</p>{" "}
              Colocamos las necesidades y objetivos de nuestros clientes en el
              centro de todo lo que hacemos. Nos esfozamos por comprender sus
              desafíos y ofrecer soluciones adaptadas a sus metas comerciales.{" "}
            </p>

            <p style={{ lineHeight: "1.6", color: "#555" }}>
              <p style={{ fontWeight: "bold" }}>Excelencia:</p> Buscamos la
              excelencia en todos los aspectos de nuestro trabajo, desde la
              calidad de nuestros sevicios hasta la atención al cliente. Nos
              esfozamos por superar las expectativas y alcanzar estándares de
              alto rendimiento.{" "}
            </p>

            <p style={{ lineHeight: "1.6", color: "#555" }}>
              <p style={{ fontWeight: "bold" }}>Aprendizaje Continuo:</p>{" "}
              Fomentamos una cultura de aprendizaje constante, donde la mejora
              continua y la adaptabilidad son fundamentales para nuestro éxito
              individual y colectivo.
            </p>
          </ScrollPanel>
        </Card>

        <Card
          title="Objetivo"
          style={{
            width: "300px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            Ola busca consolidar y fotalecer su imagen de marca a nivel exteno,
            comunicando de manera coherente y positiva sus valores, sevicios
            innovadores y compromiso. A través de una comunicación estratégica,
            transparente y atractiva, buscamos constuir y mantener una
            reputación sólida que respalde el crecimiento sostenible de la
            organización en la mente de nuestros stakeholders.
          </p>
        </Card>

        <Card
          title="¿Qué vendemos?"
          style={{
            width: "300px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            En Ola, no simplemente ofrecemos sevicios; vendemos esperanza y
            opotunidades, ya que nos dedicamos a proporcionar a nuestros
            clientes la posibilidad de transfomar sus negocios y alcanzar metas
            que antes podían haber parecido inalcanzables.
          </p>
        </Card>

        <Card
          title="¿Por qué se llama Ola?"
          style={{
            width: "300px",
            height: "600px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <ScrollPanel style={{ width: "110%", height: "450px" }}>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Ola simboliza la vastedad y misteio del océano, donde solo
              conocemos una fracción mínima de lo que alberga, siendo el resto
              un enigma. Este concepto encuentra su paralelo en la vida
              comercial: comprendemos lo que tenemos en el presente, pero el
              futuro comercial es desconocido. Así como las olas en el mar, que
              llegan con distintas intensidades y fomas, Ola representa una
              estrategia diseñada para cada comercio. Al igual que el agua que
              foma la ola, nuestras estrategias son personalizadas, adaptándose
              a las necesidades específicas de cada negocio. Pueden ser tan
              diversas como pequeñas o grandes olas, ya que reconocemos que cada
              comercio requiere una aproximación única.
            </p>
          </ScrollPanel>
        </Card>
        <Card
          title="¿Cuál es el color de Ola?"
          style={{
            width: "300px",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            La elección del color morado refleja nuestra dedicación a la
            creatividad, innovación y grandeza, buscando inspirar un crecimiento
            significativo en cada empresa con la que colaboramos
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
