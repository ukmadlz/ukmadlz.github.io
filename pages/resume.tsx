import { faAlgolia, faAws, faBitbucket, faCloudflare, faCss3, faDigitalOcean, faDocker, faGithub, faHtml5, faJs, faLaravel, faLinux, faMicrosoft, faNodeJs, faPhp, faReact, faStackOverflow, faStripe, faYarn } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fab, Grid, Link, Card, CardHeader, CardContent, Tooltip, Typography, Avatar } from '@material-ui/core'
import { buildUrl } from 'cloudinary-build-url'
import Image from 'next/image'
import React from 'react'
import Layout from '../components/layout/component'
import { socials } from '../components/socials/component'
import * as styles from '../styles/resume.css'

const skills = [{
  name: 'React',
  logo: <FontAwesomeIcon icon={faReact} className={styles.skillsIcon}/>,
},{
  name: 'Node',
  logo: <FontAwesomeIcon icon={faNodeJs} className={styles.skillsIcon}/>,
},{
  name: 'PHP',
  logo: <FontAwesomeIcon icon={faPhp} className={styles.skillsIcon}/>,
},{
  name: 'AWS',
  logo: <FontAwesomeIcon icon={faAws} className={styles.skillsIcon}/>,
},{
  name: 'Algolia',
  logo: <FontAwesomeIcon icon={faAlgolia} className={styles.skillsIcon}/>,
},{
  name: 'BitBucket',
  logo: <FontAwesomeIcon icon={faBitbucket} className={styles.skillsIcon}/>,
},{
  name: 'Digital Ocean',
  logo: <FontAwesomeIcon icon={faDigitalOcean} className={styles.skillsIcon}/>,
},{
  name: 'Docker',
  logo: <FontAwesomeIcon icon={faDocker} className={styles.skillsIcon}/>,
},{
  name: 'GitHub',
  logo: <FontAwesomeIcon icon={faGithub} className={styles.skillsIcon}/>,
},{
  name: 'HTML5',
  logo: <FontAwesomeIcon icon={faHtml5} className={styles.skillsIcon}/>,
},{
  name: 'CSS3',
  logo: <FontAwesomeIcon icon={faCss3} className={styles.skillsIcon}/>,
},{
  name: 'JS',
  logo: <FontAwesomeIcon icon={faJs} className={styles.skillsIcon}/>,
},{
  name: 'Laravel',
  logo: <FontAwesomeIcon icon={faLaravel} className={styles.skillsIcon}/>,
},{
  name: 'Linux',
  logo: <FontAwesomeIcon icon={faLinux} className={styles.skillsIcon}/>,
},{
  name: 'Stack Overflow',
  logo: <FontAwesomeIcon icon={faStackOverflow} className={styles.skillsIcon}/>,
},{
  name: 'Stripe',
  logo: <FontAwesomeIcon icon={faStripe} className={styles.skillsIcon}/>,
},{
  name: 'Yarn',
  logo: <FontAwesomeIcon icon={faYarn} className={styles.skillsIcon}/>,
},{
  name: 'Cloudflare',
  logo: <FontAwesomeIcon icon={faCloudflare} className={styles.skillsIcon}/>,
},{
  name: 'Azure',
  logo: <FontAwesomeIcon icon={faMicrosoft} className={styles.skillsIcon}/>,
},{
  name: 'CircleCI',
  logo: (<Image
    alt="CircleCI"
    src="https://res.cloudinary.com/elsmore-me/image/upload/elsmore.me/icons/circleci"
    className={styles.skillsIcon}
    width="25rem"
    height="25rem" 
  />),
}];

const companyAvatarUrl = (imageName: string) => {
  return buildUrl(`elsmore.me/company/${imageName}`, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      crop: 'lpad',
      width: 200,
      height: 200,
    }
  });
}


export default function Resume () {
  return (<Layout
    title="Mike's Resume"
    description="My professional career so far"
    color="dark-blue"
    heroImageName="mike-at-work"
  >
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h2" color="textSecondary">
          Contact Details
        </Typography>
        <Grid container spacing={1}>
          {socials(styles.contactLinkIcon).map((social, index) => {
            const displayLink = (social.name === "E-mail") ? "mike@elsmore.me" : social.link; 
            return (
              <Grid item xs md={12}  key={`social-contact-${index}`}>
                <Typography>
                  <Link href={social.link} target="_blank" className={styles.contactLinkText} >
                    {social.logo} {displayLink}
                  </Link> 
                </Typography>
              </Grid>
            )
          })}
          <Grid item xs={6} md={12}>
            <Typography>
              <Link href="https://elsmore.me" target="_blank" className={styles.contactLinkText} >
                <FontAwesomeIcon icon={faLink} className={styles.contactLinkIcon} /> {`https://elsmore.me`}
              </Link> 
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h2" color="textSecondary">
          Summary
        </Typography>
        <Typography paragraph>
          {`I live and breathe technology, not only is it the passion I chose and follow as a career but it's also a heavy part of my past and current hobbies.`}
        </Typography>
        <Typography paragraph>
          {`I consider myself a backend engineer, but I throw my hands at most things, learning DevOps, Developer Tooling, React, and anything else useful in multiple roles. After learning these new skills I happily teach others, either through mentoring, talks, or just helping out where I can.`}
        </Typography>
        <Typography paragraph>
          {`I wasn't kidding when I say my hobbies revolve around code, I can often be found outside of work `}
          <Link href="https://twitch.tv/ukmadlz" target="_blank">streaming on Twitch</Link>
          {` building something or other, or even doing maintenance. I've also been running or helping to run developer events for the better part of a decade, and recently taken up `}
          <Link href="https://anchor.fm/tech-off-topic" target="_blank">tech podcasting</Link>
          {` to keep myself busy.`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" color="textSecondary">
          Skills
        </Typography>

        {skills.map((skill, index) => {
          return (
            <Tooltip key={`skill-icon-${index}`} title={skill.name} aria-label={skill.name}>
              <Fab
                size="small"
              >
                {skill.logo}
              </Fab>
            </Tooltip>)
        })}

      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" color="textSecondary">
          {`Jobs`}
        </Typography>

        <Card className={styles.job_card}>
          <CardHeader
            title="InfoSum - Lead Developer Advocate"
            subheader="May 2022 - Current"
            avatar={<Avatar
              alt="InfoSum"
              src={companyAvatarUrl('infosum')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="CloudQuery - Senior Developer Advocate"
            subheader="October 2021 - April 2022"
            avatar={<Avatar
              alt="CloudQuery"
              src={companyAvatarUrl('cloudquery')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
              {`At CloudQuery I've been primarily working towards content generation for using the CloudQuery itself, and the surrounding platforms to simplify usage, on top of that I've been incubating the community to start encouraging an ecosystem as well as adoption.`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="Optic Labs - Developer Advocate"
            subheader="May 2021 - July 2021"
            avatar={<Avatar
              alt="Optic Labs"
              src={companyAvatarUrl('optic-lab')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
              {`During my time at Optic, I took responsibility for beginning the program of specifying, designing, building, and releasing the initial Optic SDKs (with Node being the first released). Alongside this, I did prototyping using Optic with other projects in the OSS world, as well as writing, some documentation work, and live streaming. On top of this, I started looking into how to develop relationships with the existing community, as well as try to work out how to monitor the health of the existing OSS user base.`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="Logz.io - Developer Advocate"
            subheader="February 2020 - February 2021"
            avatar={<Avatar
              alt="Logz.io"
              src={companyAvatarUrl('logz-io')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            {`Working as a Developer Advocate within the Product Marketing organisation, I cover supporting wider marketing (and other orgs) activities within Logz.IO to support users of the Open Source technology the Logz.IO Observability Platform is built upon. I've introduced streaming as a means of outreach, as well as starting a videocast/podcast around OpenObservability to promote Open Source tools for Observability within the wider DevOps and Developer communities. Alongside this I produce talks, blogs, and technical assets to support practitioners around Open Source and Logz.io, and where possible feed the practitioners feedback back into the product.`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="Packt Publishing - Lead Developer"
            subheader="May 2018 - January 2020"
            avatar={<Avatar
              alt="Packt Publishing"
              src={companyAvatarUrl('packt')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            {`Leading the redevelopment of its current internal architecture to a smaller more repeatable (micro)service architecture. As well as development, I help with upskilling the team and when requested do Developer Relations tasks.`}
            </Typography>
            <Typography paragraph variant="body2">
            {`My primary tasks have been`}
            <ul>
              <li>Basic Solution architecture</li>
              <li>Complete re-architecture of the in-house microservice platform.</li>
              <li>Service investigation and design</li>
              <li>Leading the service engineers and preparing for go live</li>
            </ul>
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="BuiltByMe - Contractor"
            subheader="April 2017 - April 2019"
            avatar={<Avatar
              alt="BuiltByMe"
              src={companyAvatarUrl('builtbyme')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            {`Freelance software development in Nodejs & PHP, everything from building SDKs & client libraries to full-stack development and systems architecture. Also specialising in consultancy around Developer Relations, with content delivery, developer onboarding, developer outreach and strategy execution.`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="IBM - Developer Advocate"
            subheader="September 2014 - April 2017"
            avatar={<Avatar
              alt="IBM"
              src={companyAvatarUrl('ibm')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            {`Developer Advocate for Cloud Data Services, covering products like Cloudant, dashDB, Apache Spark and Graph Data Store. My core focus has been developer outreach in Europe through speaking at conferences, meetups and hackathons. I write conference talks, workshops and blog posts to support our online and offline research, as well as develop proofs-of-concept and prototypes around our technologies and others. Recently I've also taken ownership of client libraries for early-stage products.`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="Blubolt - Develoer"
            subheader="April 2014 - September 2014"
            avatar={<Avatar
              alt="Blubolt"
              src={companyAvatarUrl('blubolt')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            {`I spent my time doing API integrations into the in-house eCommerce platform named blucommerce. This was full stack work, including changes/additions to the front-end in Javascript and the back-end in PHP.`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="Winning Moves Ltd - PHP Develoer"
            subheader="December 2011 - February 2014"
            avatar={<Avatar
              alt="Winnine Moves Ltd"
              src={companyAvatarUrl('winning-moves')}
            />}
          />
          <CardContent>
            <Typography paragraph variant="body2">
            {`As a PHP Developer working under both the Software Manager & CEO I work on a multitude of projects. Producing fixes and updates to major international Web Applications such as http://www.benchmarkindex.com as well as from the ground up sites and applications (including mobile interfaces for parts of an internal CRM).`}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="BAM Agency - Web Developer"
            subheader="January 2011 - December 2011"
            avatar={<Avatar
              alt="BAM Agency"
              src={companyAvatarUrl('bam-agency')}
            />}
          />
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="JB Global Ltd - SEO Specialist"
            subheader="June 2010 - December 2010"
            avatar={<Avatar
              alt="JB Global Ltd"
              src={companyAvatarUrl('jbglobal')}
            />}
          />
        </Card>

        <Card className={styles.job_card}>
          <CardHeader
            title="10Yetis / Petoba - Web Developer & Support"
            subheader="November 2008 - June 2010"
            avatar={<Avatar
              alt="10Yetis / Petoba"
              src={companyAvatarUrl('10yetis')}
            />}
          />
        </Card>

      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" color="textSecondary">
          {`Education`}
        </Typography>

        <Card className={styles.job_card}>
          <CardHeader
            title="Keele University"
            subheader="Computer Science and International History BSc (Dual) Hons 2008"
          />
        </Card>
      </Grid>
    </Grid>
    
  </Layout>)
}
