import { useOutsideClickDetector } from '@/hooks/outsideclick'
import { useRef } from 'react'

type PrivacyPolicyParams = {
  open: boolean
  close: () => void
}

export default function PrivacyModal({ open, close }: PrivacyPolicyParams) {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClickDetector(ref, close)

  return !open ? (
    <></>
  ) : (
    <div ref={ref}>
      <div>
        <div>
          <button onClick={close}>x</button>
          <div>
            <p>Privacy Policy</p>
            <p>
              Welcome to ScrollFlip, your trusted source for the latest news and
              updates!
            </p>
            <p>
              At ScrollFlip, we value your privacy and strive to protect your
              personal information. This Privacy Policy outlines how we collect,
              use, disclose, and safeguard your data when you use our mobile
              application.
            </p>
            <p>
              <p>1. Information We Collect</p>
              {`
We may collect the following types of information when you use our Services:

\u2022 Personal Information: Your name, email address, and any other information you provide when registering or creating an account. 
\u2022 Usage Information: Information about how you interact with our Services, including browsing history, articles read, preferences, and interactions with advertisements. 
\u2022 Device Information: Information about the device you use to access our Services, including device type, operating system, browser type, and IP address. 
\u2022 Location Information: We may collect your general location based on your IP address or more precise location if you grant us permission.
                `}
            </p>
            <p>
              <p>2. How We Use Your Information</p>
              {`
We use the collected information for various purposes, including but not limited to:

\u2022 Providing and improving our Services.
\u2022 Personalizing your experience and delivering relevant content.
\u2022 Sending you newsletters, updates, and promotional materials.
\u2022 Analyzing usage trends and optimizing the user experience.
\u2022 Protecting against fraudulent or unauthorized activity.`}
            </p>
            <p>
              <p>3. Sharing Your Information</p>
              {`
We may share your information in the following circumstances:

\u2022 With third-party service providers who assist us in delivering the Services.
\u2022 With advertisers and analytics providers in aggregated, non-personally identifiable form.
\u2022 In response to legal requests, such as court orders or subpoenas, to comply with legal obligations.
\u2022 In connection with the sale, merger, or acquisition of all or a portion of our company.
`}
            </p>
            <p>
              <p>4. Cookies and Tracking Technologies {`\n`}</p>
              We use cookies and similar tracking technologies to collect and
              store information about your usage of our Services. You can manage
              your cookie preferences through your browser settings.
            </p>
            <p>
              <p>5. Data Security</p>
              We implement appropriate technical and organizational measures to
              protect your information from unauthorized access, loss, misuse,
              or alteration. However, no data transmission over the internet is
              completely secure, and we cannot guarantee the security of your
              information.
            </p>
            <p>
              <p>5. Children&apos;s Privacy {`\n`}</p>
              Our Services are not intended for individuals under the age of 16.
              We do not knowingly collect personal information from children. If
              you are a parent or guardian and believe that your child has
              provided us with personal information, please contact us to
              request its deletion.
            </p>
            <p>
              <p>Changes to This Privacy Policy {`\n`}</p>
              We may update our Privacy Policy periodically. We will notify you
              of any changes by posting the updated policy on this page.
            </p>
            <p>
              <p>Contact Us {`\n`}</p>
              If you have any questions or concerns regarding this Privacy
              Policy, please contact us at privacy@scrollflip.com.
            </p>
            <p>
              By using our Services, you acknowledge that you have read and
              understood this Privacy Policy. If you do not agree with our
              practices, please do not use our Services.
              {` 
              
              
              `}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
