import InfoBlock from '@/components/InfoBlock';
import SiteGrid from '@/components/SiteGrid';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import { syncCacheAction } from '@/photo/actions';
import SiteChecklist from '@/site/SiteChecklist';
import { BiTrash } from 'react-icons/bi';

/**
 * Renders the Admin Configuration Page.
 * This page displays configuration settings.
 * @returns {JSX.Element} The rendered Admin Configuration Page.
 */
export default async function AdminConfigurationPage() {
  return (
    <SiteGrid
      contentMain={
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="flex-grow">
                   Configurações
            </div>
            <form action={syncCacheAction}>
              <SubmitButtonWithStatus
                icon={<BiTrash />}
              >
                Limpar cache
              </SubmitButtonWithStatus>
            </form>
          </div>
          <InfoBlock>
            <SiteChecklist />
          </InfoBlock>
        </div>}
    />
  );
}
