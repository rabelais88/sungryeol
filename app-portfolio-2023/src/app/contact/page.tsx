import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import ProfileVideo from './ProfileVideo';
import LayoutBase from '@/components/shared/LayoutBase';
import ContactItem from './ContactItem';

const reader = createReader(process.cwd(), keystaticConfig);

const getContact = () => reader.singletons.contact.read();

export async function generateMetadata() {
  return {};
}

export default async function Contact() {
  const contact = await getContact();
  if (!contact) return null;
  return (
    <LayoutBase pageName="contact">
      <ProfileVideo />
      <h1 className="mt-[50px] text-[62px] font-sans text-center font-thin">
        박성렬
      </h1>
      <p className="text-center font-head text-[28px] font-normal mb-[40px]">
        Park Sungryeol
      </p>
      <p className="text-center font-head text-[36px] font-normal mb-[15px]">
        FRONTEND / WEB
      </p>
      <p className="font-head text-[25px] mb-[50px] text-center">DEVELOPER</p>
      <DocumentRenderer document={await contact.content()} />
      <div data-role="margin" className="h-8"></div>
      <ContactItem
        link="https://codepen.io/rabelais88"
        label="Codepen"
        icon="codepen"
      />
      <ContactItem
        link="https://www.linkedin.com/in/sungryeol-park-958861b8?originalSubdomain=kr"
        label="LinkedIn"
        icon="linkedin"
      />
      <ContactItem
        link="https://github.com/rabelais88"
        label="Github"
        icon="github"
      />
      <ContactItem
        link="https://instagram.com/rabelais"
        label="Instagram"
        icon="instagram"
      />
      <ContactItem
        link="https://observablehq.com/@rabelais"
        label="Observable HQ"
        icon="observable"
      />
      <ContactItem
        link="https://stackoverflow.com/users/9292770/sungryeol"
        label="Stackoverflow"
        icon="stackoverflow"
      />
      <ContactItem
        link="https://sungryeol.surge.sh/resume-kr"
        label="국문 이력서"
        icon="link-skewed"
      />
      <ContactItem
        link="https://sungryeol.surge.sh/resume-en/"
        label="Résumé,CV"
        icon="link-skewed"
      />
    </LayoutBase>
  );
}
