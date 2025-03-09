import Header from "../Header";
import styles from "./styles.module.scss";

const PageLayout = (props) => {
  return (
    <div className={`${styles.container} ${screen && styles.screen}`}>
      {props?.title && (
        <section className={styles.header_container}>
          <Header
            title={props.title}
            titleVariant={props.titleVariant}
            description={props.description}
            actions={props.actions}
            links={props.links}
            goBack={props.goBack}
            goBackCb={props.goBackCb}
          />
        </section>
      )}

      <section id="page_layout" className={styles.children_container}>
        {props.children}
      </section>
    </div>
  );
};

export default PageLayout;
