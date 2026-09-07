import { getPayload } from 'payload'

import config from '../src/payload.config'
import { seedPortfolio } from '../plugins/portfolio/src/seed'

if (!process.env.S3_BUCKET) {
  throw new Error('Configure S3 storage before running the remote portfolio seed.')
}

const payload = await getPayload({ config, disableOnInit: true })

try {
  const before = await payload.findGlobal({ slug: 'portfolio', depth: 0, draft: true })
  console.log(
    'Before seed:',
    JSON.stringify({ seedVersion: before.seedVersion, status: before._status }),
  )
  await seedPortfolio({ mediaCollection: 'media', payload })
  const after = await payload.findGlobal({ slug: 'portfolio', depth: 1, draft: false })
  console.log(
    'After seed:',
    JSON.stringify(
      {
        seedVersion: after.seedVersion,
        status: after._status,
        fullName: after.identity?.fullName,
        experienceEntries: after.experience?.entries?.length,
        capabilities: after.capabilities?.items?.length,
        trainingGroups: after.training?.groups?.length,
        heroImage: after.hero?.image,
        featuredImage: after.projects?.featured?.image,
      },
      null,
      2,
    ),
  )
} finally {
  await payload.destroy()
}
