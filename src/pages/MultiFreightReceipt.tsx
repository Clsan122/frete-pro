
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getFreightById } from "@/utils/storage";
import { Freight } from "@/types";
import Layout from "@/components/Layout";
import MultiFreightReceiptGenerator from "@/components/MultiFreightReceiptGenerator";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MultiFreightReceipt: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [freights, setFreights] = useState<Freight[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (!idsParam) {
      toast({
        title: "Erro",
        description: "Nenhum frete selecionado para o recibo.",
        variant: "destructive",
      });
      return;
    }

    const ids = idsParam.split(",");
    const freightsList = ids
      .map(id => getFreightById(id))
      .filter(freight => freight !== null) as Freight[];

    if (freightsList.length === 0) {
      toast({
        title: "Erro",
        description: "Nenhum frete válido encontrado para os IDs fornecidos.",
        variant: "destructive",
      });
      return;
    }

    setFreights(freightsList);
  }, [searchParams, toast]);

  return (
    <Layout>
      <div className="container mx-auto py-4 px-2 md:px-4 max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold">Recibo de Múltiplos Fretes</h1>
          
          <Button
            onClick={() => navigate("/freight-selection")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
        
        {freights.length > 0 ? (
          <div className="overflow-x-auto">
            <MultiFreightReceiptGenerator freights={freights} />
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p>Carregando fretes...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MultiFreightReceipt;
