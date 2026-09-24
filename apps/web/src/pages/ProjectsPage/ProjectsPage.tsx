import { CrudPage } from '../../components/crud/CrudPage'
import { projectCrudConfig } from './projectCrudConfig'

/** Só dois campos: criar e editar ficam no dialog do próprio CrudPage. */
export function ProjectsPage() {
  return <CrudPage config={projectCrudConfig} />
}
