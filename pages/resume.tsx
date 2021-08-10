import { faNodeJs, faPhp, faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fab, Grid, Link, Tooltip, Typography } from '@material-ui/core'
import Layout from '../components/layout/component'
import { socials } from '../components/socials/component'
import * as styles from '../styles/resume.css'

const skills = [{
  name: 'React',
  logo: faReact,
},{
  name: 'Node',
  logo: faNodeJs,
},{
  name: 'PHP',
  logo: faPhp,
},];

export default function Resume () {
  return (<Layout
    title="Mike's Resume"
    description="My professional career so far"
    color="dark-blue"
    heroImageName="mike-at-work"
  >
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h4" component="h2" color="textSecondary">
          Contact Details
        </Typography>
        {socials(styles.contactLinkIcon).map((social, index) => {
          const displayLink = (social.name === "E-mail") ? "mike@elsmore.me" : social.link; 
          return (
            <Typography key={`social-contact-${index}`}>
              <Link href={social.link} target="_blank" className={styles.contactLinkText} >
                {social.logo} {displayLink}
              </Link> 
            </Typography>
          )
        })}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" component="h2" color="textSecondary">
          Summary
        </Typography>
        <Typography>
          {`As with most people in software, I spend most of my life at a keyboard, but I'm lucky that my hobby is my job. I spend my time helping others (and myself) to learn new things and occasionally solve different and difficult problems.`}
        </Typography>
        <Typography variant="h4" component="h2" color="textSecondary">
          Skills
        </Typography>

        {skills.map((skill, index) => {
          return (
            <Tooltip key={`skill-icon-${index}`} title={skill.name} aria-label={skill.name}>
              <Fab>
                <FontAwesomeIcon icon={skill.logo} className={styles.skillsIcon}/>
              </Fab>
            </Tooltip>)
        })}

      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" color="textSecondary">
          {`Job's`}
        </Typography>
      </Grid>
    </Grid>
    
  </Layout>)
}
