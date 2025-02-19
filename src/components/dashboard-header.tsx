import { FC } from 'react';
import { BarChart3 } from 'lucide-react';

// import { Button } from '@/components/ui/button';

import { Period } from '@/types/meta-ads';

interface DashboardHeaderProps {
  period: Period;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ period }) => {
  // const handleContactClick = () => {
  //   const message = encodeURIComponent(
  //     'Olá! Vi o dashboard de resultados da Pandox Inspirações e gostaria de mais informações sobre gestão de tráfego pago.'
  //   );
  //   window.open(`https://wa.me/5581992480658?text=${message}`, '_blank');
  // };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Dashboard Meta Ads - Pandox Inspirações
          </h1>
          <div className="text-sm font-normal text-gray-500">
            Período: {period.start} a {period.end} (última atualização dia 19 de
            Fevereiro de 2025, 09h:04min)
          </div>
        </div>
      </div>
      {/* 
      <Button
        onClick={handleContactClick}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
      >
        <MessageSquare className="h-4 w-4" />
        Falar com Gestor
      </Button> */}
    </div>
  );
};
